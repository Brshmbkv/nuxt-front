<template>
  <div>
    <div @click="$emit('toggleModal', false)" v-if="showModal" class="fixed inset-0 bg-black opacity-25 cursor-pointer"></div>
    <div v-if="showModal" class="absolute inset-0 md:inset-y-0 md:inset-x-12 lg:inset-x-56 bg-white z-50 overflow-y-auto p-10 space-y-4 flex flex-col">
      <div class="flex justify-between items-center">
        <slot name="heading"></slot>
        <button class="p-1" @click.prevent="$emit('toggleModal', false)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <slot name="content"></slot>
      <div class="flex flex-1 items-end justify-end space-x-2">
        <slot name="buttons" :close="close"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close(){
      this.$emit('toggleModal', false)
    }
  }
}
</script>