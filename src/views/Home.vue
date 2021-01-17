<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light mb-4">
      <span class="navbar-brand d-flex align-items-center" >
        <span class="logo mr-2"></span>
        <span>ToDoList</span>
      </span>
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="add">代办事项</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="done">已完成</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="delete">已删除</router-link>
        </li>
      </ul>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {}
})
</script>
<style scoped>
.logo {
  background: url("~@/assets/logo.png") no-repeat center center;
  background-size: contain;
  width: 40px;
  height: 40px;
}
</style>
