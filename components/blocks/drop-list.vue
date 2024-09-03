<template>
  <div id="drop-list">
    <div @click="actDrop = !actDrop"  class="drop-list__selected h-full">
      <div v-html="selectedEl ? funVal(selectedEl) : pls">

      </div>
      <img
        class="transform transition-all w-15px"
        :class="actDrop ? 'rotate-180' : 'rotate-0'"
        src="@/assets/images/icons/arrow.svg"
        alt=""
      />
    </div>
    <div
      v-if="actDrop && list.length"
      class="drop-list__list"
    >
      <div
        v-for="(el, i) in list"
        :key="el + i"
        @click="$emit('select', el), (actDrop = false)"
        class="px-10px cursor-pointer py-7px hover:bg-gray-100"
        v-html="funVal(el)"
      >
        
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: Array,
  pls: String,
  selectedEl: [String, Object],
  funVal: {
    type: Function,
    default: (el) => el,
  },
});
const actDrop = ref(false);
const outside = ()=> {
  if(actDrop.value) {
    actDrop.value = false
  }
}

</script>

<style scoped>
#drop-list {
  @apply relative;
}

#drop-list .drop-list__selected {
  @apply border border-rarely-1 flex flex items-center gap-5px justify-between cursor-pointer rounded-6px p-10px;
}

#drop-list .drop-list__list {
  @apply bg-white z-10 absolute w-full rounded-5px top-full max-h-300px overflow-auto border md:(inline w-auto) flex flex-col;
}
</style>