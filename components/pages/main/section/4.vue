<template>
   <section id="section-4" class="md:h-screen w-full my-20px">
      <div class="container font-mulish w-full h-full flex flex-col gap-60px justify-center items-center">
         <h3 class="font-bold text-30px">Почему мы?</h3>
         <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:(gap-y-30px) gap-y-40px gap-x-40px">
            <div v-for="item in list" :key="item.title" class=" md:(border-none pb-0px) pb-20px border-b-1 border-black">
               <div class="flex items-center gap-15px mb-15px">
                  <UiCheck class="w-40px h-40px"/> 
                  <p class="text-18px font-bold">{{item.title}}</p>
               </div>
               <p>
                  {{ item.content }}
               </p>
            </div>
         </div>
      </div>
   </section>
</template>
<style scoped>

</style>

<script setup>

const list =  [
   {
      title: 'Экологичность',
      content: 'В качестве фильтра в нашем устройстве используются исключительно экологичные и не требующие специальной утилизации материалы'
   },
   {
      title: 'Тишина',
      content: 'При работе устройство выдает шум не свыше 50 дБ'
   },
   {
      title: 'Энергопотребление',
      content: 'Устройство имеет низкое энергопотребление'
   },
   {
      title: 'Дизайн',
      content: 'Минималистичный дизайн хорошо впишется во множество интерьеров'
   },
   {
      title: 'Фильтр',
      content: 'Широкий спектр веществ, от которых наши фильтры очищают воздух'
   },
   {
      title: 'Здоровье',
      content: 'Чистота - залог здоровья!'
   }
]
</script>