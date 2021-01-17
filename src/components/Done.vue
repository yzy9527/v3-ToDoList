<template>
  <div class="list-group">
    <ul class="list-group">
      <li
        class="list-group-item d-flex align-item-center justify-content-between"
        v-for="item in dones"
        :key="item.id"
      >{{item.text}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  setup () {
    return {}
  },
  computed: {
    ...mapGetters(['dones'])
  }
})
</script>
<style scoped>
</style>
