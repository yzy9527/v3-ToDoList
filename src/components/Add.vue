<template>
  <div class="form-group">
    <label>添加代办事宜</label>
    <small>(回车加入)</small>
    <div class="row">
      <div class="col-8">
        <input @keydown.enter="add" type="text" v-model="inputValue" class="form-control">
      </div>
      <div class="col-4">
        <select class="form-control">
          <option value="">选择以过滤</option>
          <option value="">待办中</option>
          <option value="">已完成</option>
          <option value="">已删除</option>
        </select>
      </div>
    </div>
  </div>
  <ul class="list-group">
    <li
class="list-group-item"
        v-for="item in todos"
        @click="check(item)"
        :key="item.id">
      <div class="form-check">
        <input
          :id="item.id"
          type="checkbox"
          class="form-checkinput mr-2"
          :checked="item.state === TodoItemState.DONE"
          :disabled="item.state === TodoItemState.DELETE"
        >
        <label :for="item.id">{{ item }}</label>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import store from '@/store'
import { TodoItemState } from '@/common/const'
import { TodoItem } from '@/common/interface'

export default defineComponent({
  setup() {
    const inputValue = ref('')
    const add = () => {
      console.log(inputValue.value)
      store.commit('ADD', inputValue.value)
    }
    const check = (item: TodoItem) => {
      store.commit('CHECK', item.id)
    }
    return reactive({
      inputValue,
      add,
      todos: computed(() => store.state.todos),
      TodoItemState,
      check
    })
  }
})
</script>
<style scoped>
</style>
