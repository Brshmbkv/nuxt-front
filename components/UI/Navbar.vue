<template>
  <header class="relative bg-white lg:px-0 lg:py-4 lg:shadow-md">
    <!-- Mobile, Tablet -->
    <div class="flex px-4 py-3 justify-between items-center shadow-md lg:hidden">
      <h1 class="font-semibold text-xl">know.iitu.edu.kz</h1>
      <button class="p-1" @click.prevent="toggleNav" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <div v-if="showMobileNav" class="absolute top-0 inset-x-0 p-2 transition lg:hidden">
      <div class="flex flex-col space-y-3 border rounded-md px-4 py-2 bg-white">
        <div class="flex justify-between items-center">
          <h1 class="font-semibold text-xl">know.iitu.edu.kz</h1>
          <button class="p-1" @click.prevent="toggleNav" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav class="flex flex-col space-y-2 antialiased text-base">
          <div>
            Signed in as <span class="font-medium">{{userFullname}}</span>
          </div>
          <div class="flex flex-col font-medium">
            links
          </div>
          <template v-if="isAuthenticated">
            <a class="py-0.5 font-medium cursor-pointer" @click.prevent="logout">Sign out</a>
          </template>
          <template v-else>
            <NuxtLink :to="{name: 'login'}">Login</NuxtLink>
            <NuxtLink :to="{name: 'register'}">Register</NuxtLink>
          </template>
        </nav>
      </div>
    </div>
    <!-- Desktop -->
    <div class="hidden lg:flex lg:justify-between lg:px-8">
      <label class="relative flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input class="w-96 py-1 pl-10 bg-gray-100 rounded-md focus:outline-none focus:border-b" type="text" placeholder="Search know.iitu.edu.kz"/>
      </label>
      <div class="flex items-center font-medium space-x-3">
        <div class="flex flex-col">
          <h3>{{userFullname}}</h3>
          <span class="text-xs -mt-1">Role: {{user.role_name}}</span>
          
        </div>
        <span class="h-8 w-0.5 bg-black"></span>
        <a @click.prevent="logout" class="font-medium cursor-pointer">Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      showMobileNav: false
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$nuxt.refresh();
    },
    toggleNav() {
      this.showMobileNav = !this.showMobileNav
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
    userFullname() {
      const name = this.user.first_name ?? "";
      const surname = this.user.last_name ?? "";
      return name + " " + surname;
    }
  }
};
</script>
