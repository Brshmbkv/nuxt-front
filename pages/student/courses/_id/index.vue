<template>
  <div>
    <p>Breadcrumbs</p>
    <h1 class="text-3xl font-semibold mb-2">{{ course.name }}</h1>
    <div class="flex space-x-2 mb-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
      <p class="text-gray-600 font-medium">{{ course.teacher.full_name }}</p>
    </div>
    <p class="text-base text-gray-500 mb-4">{{ course.description }}</p>
    <div
      class="flex flex-col space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0"
    >
      <div
        v-for="schedule in schedules"
        :key="schedule.id"
        class="flex flex-col space-y-4 shadow-md px-6 py-3"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-medium">{{ schedule.chapter.name }}</h3>
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
                stroke-width="1"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="font-light text-base">{{ schedule.starts_at }}</p>
          </div>
        </div>
        <p class="text-sm font-medium text-gray-500">
          {{ schedule.chapter.description }}
        </p>
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <a
            v-for="(exercise, index) in schedule.chapter.exercises"
            :key="index"
            @click="goToSchedule(exercise.id)"
            class="cursor-pointer border rounded-full px-4 py-0.5 transition hover:bg-gray-200"
          >
            {{exercise.name}}
          </a>
        </div>  
        <div class="flex justify-between">
          <p
            class="text-sm font-semibold px-4 py-0.5 rounded-full"
            :class="{
              'bg-green-300': schedule.attendance.status.color === 'success',
              'bg-red-400': schedule.attendance.status.color === 'failed',
              'bg-gray-300': schedule.attendance.status.color === 'default'
            }"
          >
            {{ schedule.attendance.status.text }}
          </p>
          <p class="font-medium">Score: {{schedule.attendance.score}}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {},
      schedules: []
    };
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { course, schedules } = await $axios.$get(`/courses/${params.id}`);
      return {
        course,
        schedules
      };
    } catch (e) {
      error({ message: e.response.statusText, statusCode: e.response.status });
    }
  },
  methods: {
    goToSchedule(id) {
      this.$router.push({ name: "student-schedule-id", params: { id } });
    }
  }
};
</script>
