export const useMyFetch = async (request, opts) => {
   const config = useRuntimeConfig()
   let URL = 'https://online.mosgortur.ru/api-mk-admin/v1/';

   const res = await fetch(URL + request, opts)
   return await res.json()
}