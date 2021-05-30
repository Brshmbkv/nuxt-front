<template>
  <div
    class="flex flex-col space-y-6 border px-8 py-4 rounded-xl bg-white lg:p-4 cursor-pointer"
    @click.prevent="goToCourse(course.id)"
  >
    <div
      class="flex-shrink-0 w-14 h-14 rounded-md bg-green-300 flex items-center justify-center"
    >
      <span>logo</span>
    </div>
    <div class="flex flex-col space-y-1 text-gray-500 font-medium">
      <div>
        <h3 class="text-xl text-black font-bold lg:text-base">
          {{ course.name }}
        </h3>
      </div>
      <div class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <p class="text-sm">
          {{ course.teacher.first_name + " " + course.teacher.last_name }}
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <p class="text-xs">
          {{ course.teacher.email }}
        </p>
      </div>
    </div>
    <div>
      <div class="flex justify-between text-sm">
        <span>Progress</span>
        <span>{{ course.progress }}%</span>
      </div>
      <div class="relative pt-1">
        <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
          <div
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            :style="{ width: course.progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToCourse(id) {
      this.$router.push({ name: "student-courses-id", params: { id } });
    }
  }
};
</script>
