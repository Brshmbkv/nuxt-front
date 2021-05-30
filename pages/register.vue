<template>
  <div class="flex flex-col h-screen w-full items-center py-12">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(userRegister)">
        <h2 class="text-3xl font-semibold mb-8">Register</h2>
        <ValidationProvider
          name="Name"
          tag="div"
          rules="required"
          v-slot="{ errors }"
          class="flex flex-col"
        >
          <label class="text-gray-700">Name</label>
          <input
            type="text"
            class="mt-1 block w-72 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model.trim="form.first_name"
            autofocus
            :class="{ 'border-red-600 ring ring-red-200': errors.length > 0 }"
          />
          <span v-show="errors.length > 0" class="text-red-600">{{
            errors[0]
          }}</span>
        </ValidationProvider>
        <ValidationProvider
          name="Surname"
          tag="div"
          rules="required"
          v-slot="{ errors }"
          class="flex flex-col"
        >
          <label class="text-gray-700">Surname</label>
          <input
            type="text"
            class="mt-1 block w-72 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model.trim="form.last_name"
            :class="{ 'border-red-600 ring ring-red-200': errors.length > 0 }"
          />
          <span v-show="errors.length > 0" class="text-red-600">{{
            errors[0]
          }}</span>
        </ValidationProvider>
        <ValidationProvider
          name="Email"
          tag="div"
          rules="required|email"
          v-slot="{ errors }"
          class="flex flex-col"
        >
          <label class="text-gray-700">Email address</label>
          <input
            type="email"
            class="mt-1 block w-72 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model.trim="form.email"
            :class="{ 'border-red-600 ring ring-red-200': errors.length > 0 }"
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
          vid="password"
          class="flex flex-col"
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
        <ValidationProvider
          name="Password confirm"
          tag="div"
          rules="required|comfirmed:password"
          v-slot="{ errors }"
          class="flex flex-col"
        >
          <label class="text-gray-700">Confirm Password</label>
          <input
            type="password"
            class="mt-1 block w-72 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model.trim="form.password_confirmation"
            :class="{ 'border-red-600 ring ring-red-200': errors.length > 0 }"
          />
          <span v-show="errors.length > 0" class="text-red-600">{{
            errors[0]
          }}</span>
        </ValidationProvider>
        <div class="flex justify-center mt-2">
          <button class="py-2 w-40 border bg-gray-200">Register</button>
        </div>
      </form>
    </ValidationObserver>
    <br />
    <p>
      Already have an account?
      <NuxtLink to="/login" class=" text-blue-500">Click here to login</NuxtLink>
    </p>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  middleware: ["authenticated"],
  layout: "index",
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    async userRegister() {
      try {
        await this.$axios.post("register", this.form);
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        });
        this.$router.push({
          path: this.$route.query.redirect || "/student/courses"
        });
      } catch (error) {}
    }
  }
};
</script>

<style></style>
