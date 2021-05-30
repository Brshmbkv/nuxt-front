<template>
  <div class="flex justify-between  border px-4 py-4 space-x-24 h-40 cursor-pointer" @click="goToGroup(group.id)">
    <div class="flex flex-col justify-between h-full">
      <h1 class="text-2xl font-medium">{{group.name}}</h1>
      <p class="text-lg">{{studentsCount}}</p>
    </div>
    <div class="flex flex-col h-full justify-around">
      <template v-for="(course,index) in group.courses">
        <p v-if="index<=2" :key="index">{{course.name}}</p>
      </template>
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
      this.$router.push({name: 'teacher-groups-id', params: {id}})
    }
  }
}
</script>