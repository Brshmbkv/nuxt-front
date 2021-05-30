<template>
  <aside class="flex flex-col space-y-16">
    <div class="flex items-center space-x-2 text-black">
      <div
        class="flex items-center justify-center w-14 h-14 bg-blue-600 flex-none rounded-xl"
      >
        <span class="text-white font-semibold text-lg tracking-wide">know</span>
      </div>
      <div class="flex flex-col">
        <h1 class="text-xl font-semibold truncate">know.iitu.edu.kz</h1>
        <p class="text-xs font-medium">Enjoy Studying Online</p>
      </div>
    </div>
    <nav class="flex flex-col space-y-2">
      <NuxtLink
        :to="{name: 'student-courses'}"
        class="flex items-center space-x-4 text-gray-500 text-lg font-medium p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <span>Courses</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
.nuxt-link-exact-active, .nuxt-link-active {
  @apply text-blue-600;
}
</style>