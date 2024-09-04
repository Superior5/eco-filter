<template>
   <section id="section-3" class="bg-[#EDEDED] md:h-screen pt-40px pb-20px w-full">
      <div class="container font-mulish w-full h-full flex flex-col items-center">
         <h3 class="font-bold text-30px">Устройства</h3>
         <p class="my-40px text-center">На данный момент разработано две версии устройства</p>
         <div class="w-full relative font-bold text-24px max-w-1000px grid grid-cols-1">
            <div class="grid grid-cols-2">
               <div class="h-300px bg-[#798d9e] border-black"></div>
               <div class="flex bg-white justify-center items-center">
                  CenAir
               </div>
            </div>
            <div class="grid grid-cols-2">
               <div class="flex flex-col gap-10px bg-white justify-center items-center">
                   <p>CenAir+</p>
                  <p class="text-center max-w-250px font-thin text-16px">Данная версия имеет датчик углекислого газа (СО2), возможность управления устройством с мобильного
                     телефона</p>
               </div>
               <div class="h-300px bg-[#798d9e]"></div>
            </div>
            <div class="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] w-20px h-20px rounded-[50%] bg-[#000] text-18px font-normal text-white flex justify-center items-center">+</div>
         </div>
      <div class="container w-full max-w-1000px flex gap-30px md:(flex-row mt-0 items-end ) mt-20px flex-col items-normal justify-between">
         <p class="max-w-500px">На данный момент устройство производится только по
            индивидуальному заказу.</p>
      <button @click="navigateTo('/#section-5')" class="bg-[#0caad4] md:mt-30px text-white font-bold px-30px py-15px">Связаться</button>

      </div>

      </div>

   </section>
</template>
<style scoped>

</style>