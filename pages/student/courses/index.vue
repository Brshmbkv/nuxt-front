<template>
  <div class="flex flex-col space-y-4 p-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
    <CourseCard v-for="course in courses" :key="course.id" :course="course"/>
  </div>
</template>

<script>
import CourseCard from '@/components/courses/CourseCard.vue'
export default {
  //middleware: 'guest',
  components:{
    CourseCard
  },
  data(){
    return {
      courses: []
    }
  },
  async asyncData({$axios}){
    const res = await $axios.$get('/courses').catch(e => {})
    return {
      courses: res
    }
  }
};
</script>

