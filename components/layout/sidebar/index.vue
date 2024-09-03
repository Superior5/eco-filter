<template>
  <aside id="aside-menu">
    <h1 class="text-30px text-regular-0 font-medium mb-60px text-center">
      Админ панель
    </h1>
    <nav>
      <ul>
        <li
          v-for="el in menu"
          :key="el.link"
          :class="{ 'active-tab': actPage.includes(el.link) }"
          class="not-last:border-b transition-all flex flex-col font-pts border-b border-rarely-1 !last:border-0"
        >
          <a
            @click="actPage = actPage == el.link ? '' : el.link"
            class="px-15px h-60px flex items-center cursor-pointer"
          >
            {{ el.title }}
          </a>
          <ul
            class="submenu"
            :class="{ 'act-menu': actPage.includes(el.link) }"
          >
            <li
              class="cursor-pointer border-b border-rarely-1 !last:border-0"
              v-for="item in el.pages"
              :key="item.link"
            >
              <nuxt-link
                class="h-60px pl-15px flex items-center"
                :to="`${el.link}${item.link}`"
              >
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
const store = useDataStore();
const route = useRoute();
const actPage = ref(route.path);

const menu = [
  {
    link: "/moscow-holidays",
    title: "Московские каникулы",
    pages: [
      { link: "/main", title: "Главная" },
      { link: "/intensives", title: "Интенсивы в парках" },
    ],
  },
  {
    link: "/cinema-park",
    title: "Кинопарк",
    pages: [
      { link: "/main", title: "Главная" },
    ],
  },
];
</script>

<style scoped>
#aside-menu .router-link-active {
  @apply text-regular-0 bg-regular-0/10;
}

#aside-menu .active-tab {
  @apply bg-rarely-2 font-bold;
}

#aside-menu .active-tab > a {
  @apply text-regular-0;
}

#aside-menu .submenu {
  @apply max-h-0 overflow-hidden pl-20px transition-all duration-600 font-bold;
}

#aside-menu .submenu.act-menu {
  @apply max-h-500px;
}
</style>