<template>
  <div class='lg:flex h-screen bg-gray-100 font-body'>
    <Sidebar class="bg-white hidden flex-shrink-0 px-6 py-6 w-64 lg:block border-r"/>
    <div class="lg:flex lg:flex-col flex-1 ">
      <Navbar/>
      <div class="h-full overflow-y-auto p-4">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/UI/Sidebar.vue';
import Navbar from '~/components/UI/Navbar'
export default {
  components: {
    Sidebar, Navbar
  }
};
</script>