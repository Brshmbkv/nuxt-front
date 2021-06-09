<template>
  <div class="flex flex-col space-y-2 px-8 py-4 shadow-md cursor-pointer" @click="goToGroup(group.id)">
    <h2 class="text-xl font-semibold">{{group.name}}</h2>
    <p class="text-gray-500 font-medium text-sm">{{group.description}}</p>
    <p class="text-sm font-semibold">{{studentsCount}}</p>
    <div class="border-t px-2 py-2">
      <p class="text-gray-500 text-sm">Group courses</p>
      <div class="flex flex-wrap gap-x-4">
        <div v-for="(course, index) in group.courses" :key="index">
          {{course.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  computed: {
    studentsCount(){
      const students = this.group.student_count
      return students > 1 ? students + ' students': students + ' student'
    }
  },
  methods: {
    goToGroup(id) {
      this.$router.push({name: 'teacher-groups-group', params: {group: id}})
    }
  }
}
</script>