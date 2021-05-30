<template>
  <div class="flex h-screen w-full">
    <div class="w-2/5 border-r flex justify-center items-center">
      <img src="https://iitu.kz/media/images/muit1.original.format-jpeg.jpg" alt="">
    </div>
    <div class="w-3/5 px-8 py-6 flex flex-col justify-evenly items-start">
      <div>
        <h1 class="text-7xl font-semibold">know.iitu.edu.kz</h1>
        <p class="text-2xl">Online Platform for distanse learning</p>
      </div>
      <div class="flex flex-col space-y-4">
        <NuxtLink to="/register" class="text-lg text-white px-24 py-2 rounded-full bg-blue-500">Register</NuxtLink>
        <NuxtLink to="/login" class="text-lg text-blue-500 px-24 py-2 rounded-full border border-blue-500">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "index",
  middleware: ['authenticated']
};
</script>
