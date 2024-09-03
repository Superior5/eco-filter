<template>
  <div class="container flex gap-40px py-40px">
    <LayoutSidebar class="w-2/5 max-w-300px" />
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<script setup>
const store = useDataStore();
const cookieToken = useCookie('CommonApplicationAuthTokenCookie_.masterweblight-auth')

if (cookieToken.value) {
    store.userToken = cookieToken.value;
    console.log(store.userToken);
} else {
  navigateTo('/auth')
}
</script>
