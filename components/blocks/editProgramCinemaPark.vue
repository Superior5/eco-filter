<script setup>
import { object, string, number, boolean } from "yup";
const props = defineProps({ showModal: Boolean, program: Object });
const emit = defineEmits(["close"]);

const store = useDataStore();

const image = ref(null);
const schema = object({
  name: string().required("Обязательное поле"),
  time: string().required("Обязательное поле"),
  price: number().required("Обязательное поле"),
  stopSale: boolean(),
  forWho: string().required("Обязательное поле"),
  subtitle: string().required("Обязательное поле"),
  placeName: string().required("Обязательное поле"),
  address: string().required("Обязательное поле"),
  gatheringType: string().required("Обязательное поле"),
  rout: string().required("Обязательное поле"),
  link: string().required("Обязательное поле"),
  date: string().required("Обязательное поле"),
  bookingKey: number().required("Обязательное поле"),
  long: string().required("Обязательное поле"),
});


const getTimeTrackers = (date) => {


  
  let start = new Date(date);
  let beforeStart = new Date(new Date(date).setMinutes(start.getMinutes() - 15));
  let end = new Date(new Date(date).setMinutes(start.getMinutes() + 90));

  timeTrackers.value = [
    {
      time: `${('0' + beforeStart.getHours()).slice(-2)}:${('0' + beforeStart.getMinutes()).slice(-2)}`,
      desc: 'Сбор участников в кинопарке «Москино».'
    },
    {
      time: `${('0' + start.getHours()).slice(-2)}:${('0' + start.getMinutes()).slice(-2)}`,
      desc: 'Начало экскурсии.'
    },
    {
      time: `${('0' + end.getHours()).slice(-2)}:${('0' + end.getMinutes()).slice(-2)}`,
      desc: 'Окончание экскурсии."'
    }
  ]

  formData.value.schedules = timeTrackers.value
  
}

const formData = ref(null);

watch(
  () => props.showModal,
  (v) => {
    formData.value = JSON.parse(JSON.stringify(props.program));
  }
);

const timeTracker = ref({
  time: "",
  desc: "",
});

const location = ref({
  title: "",
  desc: "",
  img: null,
  imgData: null,
});

const locationImg = ref(null);

const timeTrackers = ref([]);
const locations = ref([]);
const texts = ref([]);
const text = ref("");
const isBold = ref(false);

const addText = () => {
  if (!text.value) return false;
  
  formData.value.aboutExcursion.push({ content: text.value, bold: isBold.value });
  text.value = "";
  isBold.value = false;
};

const addTime = () => {
  if (!timeTracker.value.desc || !timeTracker.value.time) return false;

  formData.value.schedules.push(timeTracker.value);
  timeTracker.value = {
    time: "",
    desc: "",
  };
};

watch(
  () => formData.value?.date,
  (v) => {
    getTimeTrackers(v)
  }
);


const addLocation = () => {
  if (!location.value.title || !location.value.desc || !location.value.img)
    return false;

  location.value.imgData = new FormData()
  location.value.imgData.append("image", locationImg.value.input.files[0])
  formData.value.locations.push(location.value);

  location.value = {
    title: "",
    desc: "",
    img: null,
    imgData: null,
  };

  locationImg.value = null;
};

const deleteLocation = (i) => {
  formData.value.locations.splice(i, 1);
};

const deleteText = (i) => {
  formData.value.aboutExcursion.splice(i, 1);
};

const deleteTime = (i) => {
  formData.value.schedules.splice(i, 1);
};

const isLoading = ref(false);

async function onSubmit(event) {
  isLoading.value = true;

  const fileData = new FormData();
  fileData.append("image", image.value.input.files[0]);

  await store.updateCinemaParkProgramm({
    file: fileData,
    formData: { ...formData.value },
  });
  await store.getCinemaParkProgramm();

  alert("Программа обновлена");
  isLoading.value = false;
  emit("close");
}
</script>

<template>
  <BlocksModal
    @close="$emit('close')"
    :show="showModal"
    classes="max-w-600px overflow-auto scroll-style"
  >
    <UForm
      v-if="formData"
      :schema="schema"
      :state="formData"
      class="u-form"
      @submit="onSubmit"
    >
        <div class="grid grid-cols-2 gap-20px mb-20px">
          <UFormGroup label="Старый ID" name="oldId">
            <UInput v-model="formData.oldId" />
          </UFormGroup>

          <UFormGroup label="Название" name="name">
            <UInput v-model="formData.name" />
          </UFormGroup>

          <UFormGroup label="Продолжительность" name="time">
            <UInput v-model="formData.time" />
          </UFormGroup>

          <UFormGroup label="Цена" name="price">
            <UInput v-model="formData.price" type="number" />
          </UFormGroup>

          <UFormGroup label="Для кого" name="forWho">
            <UInput v-model="formData.forWho" />
          </UFormGroup>
          <div>
            <UFormGroup label="Закрыть продажи" name="stopSale">
              <UCheckbox width="30px" v-model="formData.stopSale" />
            </UFormGroup>

            <UFormGroup label="Показывать на главной" name="show">
              <UCheckbox width="30px" v-model="formData.show" />
            </UFormGroup>
          </div>

          <UFormGroup label="Тематика" name="subtitle">
            <UInput v-model="formData.subtitle" />
          </UFormGroup>

          <UFormGroup label="Примечание" name="notice">
            <UInput v-model="formData.notice" />
          </UFormGroup>

          <UFormGroup label="Место проведения" name="placeName">
            <UInput v-model="formData.placeName" />
          </UFormGroup>

          <UFormGroup label="Тип мероприятия" name="gatheringType">
            <UInput v-model="formData.gatheringType" />
          </UFormGroup>

          <UFormGroup label="Маршрут" name="route">
            <UInput v-model="formData.rout" />
          </UFormGroup>

          <UFormGroup label="Количество людей в группе" name="groupCount">
            <UInput v-model="formData.groupCount" type="number" />
          </UFormGroup>

          <UFormGroup label="Адрес" name="address">
            <UInput v-model="formData.address" />
          </UFormGroup>

          <UFormGroup label="Картинка" name="image">
            <UInput
              type="file"
              icon="i-heroicons-folder"
              accept="image/*"
              ref="image"
              id="image"
            />
          </UFormGroup>

          <UFormGroup label="Ссылка" name="link">
            <UInput v-model="formData.link" />
          </UFormGroup>

          <UFormGroup label="Дата начало" name="date">
            <vue-date-picker
              v-model="formData.date"
              time-picker-inline
              cancelText="Отмена"
              selectText="Применить"
              :format="'dd.MM.yy'"
            />
          </UFormGroup>

          <UFormGroup label="Код бронирования" name="bookingKey">
            <UInput v-model="formData.bookingKey" type="number" />
          </UFormGroup>

          <UFormGroup label="Протяженность маршрута" name="long">
            <UInput v-model="formData.long" />
          </UFormGroup>

          <UFormGroup label="Тип программы (чел, группа)" name="type">
            <UInput v-model="formData.type" />
          </UFormGroup>

          <UFormGroup label="О программе" class="col-start-1 col-end-3">
            <div class="flex gap-5px">
              <UTextarea class="w-full" v-model="text" />
              <button
                @click="isBold = !isBold"
                type="button"
                class="text-40px"
                :class="{ 'font-bold text-regular-0': isBold }"
              >
                <UIcon
                  name="i-material-symbols-format-bold-rounded"
                  title="Шрифт жирным"
                />
              </button>
              <button
                type="button"
                @click="addText"
                :disabled="!text"
                class="disabled:text-black text-regular-0 text-40px"
              >
                <UIcon name="i-material-symbols-add-box" />
              </button>
            </div>
            <div class="flex flex-col mt-10px">
              <div
                class="flex justify-between items-center not-last:border-b border-regular-0 py-5px"
                v-for="(text, i) in formData.aboutExcursion"
                :key="i"
              >
                <p :class="{ 'font-bold': text.bold }">{{ text.content }}</p>
                <button
                  @click="deleteText(i)"
                  class="text-red-600 text-20px"
                  type="button"
                >
                  <UIcon name="i-material-symbols-close" />
                </button>
              </div>
            </div>
          </UFormGroup>

          <UFormGroup label="Расписание" class="col-start-1 col-end-3">
            <div class="flex gap-5px">
              <UInput
                class="w-full"
                v-model="timeTracker.time"
                placeholder="Укажите время"
              />
              <UInput
                class="w-full"
                v-model="timeTracker.desc"
                placeholder="Описание"
              />
              <button
                @click="addTime"
                type="button"
                :disabled="!timeTracker.time || !timeTracker.desc"
                class="disabled:text-black text-regular-0 text-40px"
              >
                <UIcon name="i-material-symbols-add-box" />
              </button>
            </div>
            <div class="flex flex-col mt-10px">
              <div
                class="flex justify-between items-center not-last:border-b border-regular-0 py-5px"
                v-for="(time, i) in formData.schedules"
                :key="i"
              >
                <p>
                  <span class="font-bold">{{ time.time }}:</span>
                  {{ time.desc }}
                </p>
                <button
                  @click="deleteTime(i)"
                  class="text-red-600 text-20px"
                  type="button"
                >
                  <UIcon name="i-material-symbols-close" />
                </button>
              </div>
            </div>
          </UFormGroup>

          <UFormGroup label="Локация" class="col-start-1 col-end-3">
            <div>
              <div class="flex gap-10px mb-10px">
                <UTextarea
                    resize 
                    class="w-full"
                    size="xl"
                    placeholder="Описание"
                    v-model="location.desc"
                  />
                <div class="flex flex-col gap-10px">
                  <UInput
                    class="w-full"
                    placeholder="Название"
                    v-model="location.title"
                  />
                  <UInput
                  type="file"
                  icon="i-heroicons-folder"
                  accept="image/*"
                  ref="locationImg"
                  class="h-full"
                  id="locationImg"
                  v-model="location.img"
                />
                </div>
              </div>
              <UButton
                @click="addLocation"
                class="w-full justify-center"
                type="button"
                :disabled="!location.title || !location.desc || !location.img"
              >
                Добавить локацию
              </UButton>
            </div>
            <div class="mt-10px">
              <div
                class="flex justify-between items-center not-last:border-b border-regular-0 py-5px"
                v-for="(location, i) in formData.locations"
                :key="i"
              >
                <p>{{ location.title }}</p>
                <button
                  @click="deleteLocation(i)"
                  class="text-red-600 text-20px"
                  type="button"
                >
                  <UIcon name="i-material-symbols-close" />
                </button>
              </div>
            </div>
          </UFormGroup>
        </div>
        <UButton
          :disabled="isLoading"
          type="submit"
          class="w-full justify-center py-10px"
        >
          {{ isLoading ? "Загрузка..." : "Сохранить" }}
        </UButton>
    </UForm>
  </BlocksModal>
</template>