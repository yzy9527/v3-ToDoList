<template>
  <div>
   Add
    {{abc}}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const abc = ref(999)
    abc.value++
    return {
      abc
    }
  }
})
</script>
<style scoped>
</style>
