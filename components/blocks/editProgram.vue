<script setup>
import { object, string, number, boolean } from "yup";

const props = defineProps({ showModal: Boolean, program: Object });
const emit = defineEmits(["close"]);

const store = useDataStore();

const image = ref(null);
const gallery = ref(null);
const schema = object({
  name: string().required("Обязательное поле"),
  time: string().required("Обязательное поле"),
  price: number().required("Обязательное поле"),
  stopSale: boolean(),
  forWho: string().required("Обязательное поле"),
  subtitle: string().required("Обязательное поле"),
  placeName: string().required("Обязательное поле"),
  address: string().required("Обязательное поле"),
  link: string().required("Обязательное поле"),
  date: string().required("Обязательное поле"),
  bookingKey: number().required("Обязательное поле"),
});

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

const text = ref("");
const isBold = ref(false);

const addText = () => {
  if (!text.value) return false;

  formData.value.aboutExcursion.push({
    content: text.value,
    bold: isBold.value,
  });
  text.value = "";
  isBold.value = false;
};

const addTime = () => {
  if (!timeTracker.value.desc || !timeTracker.value.time) return false;
  formData.value.schedule.push(timeTracker.value);
  timeTracker.value = {
    time: "",
    desc: "",
  };
};

const deleteText = (i) => {
  formData.value.aboutExcursion.splice(i, 1);
};

const deleteTime = (i) => {
  formData.value.schedule.splice(i, 1);
};

const isLoading = ref(false);

async function onSubmit(event) {
  isLoading.value = true;
    const requestObj={ formData: formData.value }

  if (image.value.input.files.length) {
    const fileData = new FormData();
    fileData.append("image", image.value.input.files[0]);

    requestObj.file = fileData;
  }

  if (gallery.value.input.files.length) {
    const galleryData = new FormData();

    for (let i = 0; i < gallery.value.input.files.length; i++) {
      galleryData.append("gallery" + i, gallery.value.input.files[i]);
    }

    requestObj.gallery = galleryData;
  }

  await store.updateMosholProgramm(requestObj);
  await store.getProducts();

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
        <UFormGroup label="Название" name="name">
          <UInput v-model="formData.name" />
        </UFormGroup>

        <UFormGroup label="Период проведения" name="time">
          <UInput v-model="formData.time" />
        </UFormGroup>

        <UFormGroup label="Цена" name="price">
          <UInput v-model="formData.price" type="number" />
        </UFormGroup>

        <UFormGroup label="Закрыть продажи" name="stopSale">
          <UCheckbox width="30px" v-model="formData.stopSale" />
        </UFormGroup>

        <UFormGroup label="Возраст" name="forWho">
          <UInput v-model="formData.forWho" />
        </UFormGroup>

        <UFormGroup label="Тематика" name="subtitle">
          <UInput v-model="formData.subtitle" />
        </UFormGroup>

        <UFormGroup label="Адрес" name="address">
          <UInput v-model="formData.address" />
        </UFormGroup>

        <UFormGroup label="Место проведения" name="placeName">
          <UInput v-model="formData.placeName" />
        </UFormGroup>

        <UFormGroup label="Дата начало" name="date">
          <vue-date-picker
            v-model="formData.date"
            :enable-time-picker="false"
            cancelText="Отмена"
            selectText="Применить"
          />
        </UFormGroup>

        <UFormGroup label="Картинка" name="image">
          <UInput
            type="file"
            icon="i-heroicons-folder"
            accept="image/*"
            ref="image"
            id="image"
            v-model="image"
          />
        </UFormGroup>

        <UFormGroup label="Ссылка" name="link">
          <UInput v-model="formData.link" />
        </UFormGroup>

        <UFormGroup label="Код бронирования" name="bookingKey">
          <UInput v-model="formData.bookingKey" type="number" />
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
                type="button"
                @click="deleteText(i)"
                class="text-red-600 text-20px"
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
              :disabled="!timeTracker.time || !timeTracker.desc"
              class="disabled:text-black text-regular-0 text-40px"
            >
              <UIcon name="i-material-symbols-add-box" />
            </button>
          </div>
          <div class="flex flex-col mt-10px">
            <div
              class="flex justify-between items-center not-last:border-b border-regular-0 py-5px"
              v-for="(time, i) in formData.schedule"
              :key="i"
            >
              <p>
                <span class="font-bold">{{ time.time }}:</span>
                {{ time.desc }}
              </p>
              <button
                @click="deleteTime(i)"
                type="button"
                class="text-red-600 text-20px"
              >
                <UIcon name="i-material-symbols-close" />
              </button>
            </div>
          </div>
        </UFormGroup>

        <UFormGroup label="Галерея картинок" name="gallery">
          <UInput
            type="file"
            multiple
            icon="i-heroicons-folder"
            accept="image/*"
            ref="gallery"
            id="gallery"
          />
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