<template>
  <transition name="fade">
    <div
      v-if="show"
      @click.self="$emit('close')"
      class="bg-black/60 z-30 top-0 left-0 fixed w-screen h-screen flex justify-center items-center p-20px"
    >
      <div
        class="lg:(p-56px max-w-600px) max-h-[90vh] max-w-430px py-15px children:(px-15px) w-full bg-white relative rounded-[5px] text-black"
        :class="classes"
      >
        <div
          @click="$emit('close')"
          class="absolute top-15px right-15px cursor-pointer !p-0px"
        >
          <img src="@/assets/images/icons/close.svg" alt="" />
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>


<style>
.form-scroll::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.form-scroll::-webkit-scrollbar {
  @apply w-4px;
}
.form-scroll::-webkit-scrollbar-thumb {
  @apply bg-black/50;
}
</style>
<script setup>
const props = defineProps({
  show: Boolean,
  classes: {
    type: String,
    default: "lg:max-w-480px max-w-430px",
  },
});
</script>