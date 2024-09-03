export const isLarge = () => {
   if (process.client) {
      if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
         return window.innerWidth < 1024;
      } else {
         return document.documentElement.clientWidth < 1024;
      }
   }
   return false;
}