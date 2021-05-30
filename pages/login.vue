<template>
  <div class="flex flex-col h-screen w-full items-center py-12">
    <form @submit.prevent="userLogin">
      <div class="flex flex-col px-12 pt-12 pb-6 space-y-3">
        <h2 class="text-3xl font-semibold mb-8">Login</h2>
        <ValidationProvider
          name="Email"
          tag="div"
          rules="required|email"
          v-slot="{ errors }"
          class="flex flex-col mt-6"
        >
          <label class="text-gray-700">Email address</label>
          <input
            type="email"
            v-model.trim="form.email"
            autofocus
            class="mt-1 block w-72 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            :class="{ 'border-red-600 ring ring-red-200': errors.length > 0 }"
            placeholder="Enter email here"
          />
          <span v-show="errors.length > 0" class="text-red-600">{{
            errors[0]
          }}</span>
        </ValidationProvider>
        <ValidationProvider
          name="Password"
          tag="div"
          rules="required"
          v-slot="{ errors }"
        >
          <label class="text-gray-700">Password</label>
          <input
            type="password"
            class="mt-1 block w-72 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model.trim="form.password"
            :class="{ 'border-red-600 ring ring-red-200': errors.length > 0 }"
          />
          <span v-show="errors.length > 0" class="text-red-600">{{
            errors[0]
          }}</span>
        </ValidationProvider>
        <div class="flex justify-center mt-2">
          <button class="py-2 w-40 border bg-gray-200">Login</button>
        </div>
      </div>
    </form>
    <div class="justify-self-start">
      <NuxtLink to="/register" class="text-blue-500">Click here to register</NuxtLink>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  middleware: ["authenticated"],
  layout: "index",
  components: {
    ValidationProvider
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async userLogin() {
      try {
        const res = await this.$auth.loginWith("laravelJWT", {
          data: this.form
        });
        this.$router.push({
          path: this.$route.query.redirect || "/student/courses"
        });
      } catch (e) {
        console.log(e)
      }
    }
  }
};
</script>