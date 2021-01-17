<template>
  <div class="form-group">
    <label>添加代办事宜</label>
    <small>(回车加入)</small>
    <div class="row">
      <div class="col-8">
        <input @keydown.enter="add" type="text" v-model="inputValue" class="form-control">
      </div>
      <div class="col-4">
        <select  class="form-control" v-model="filterState">
          <option :value="TodoItemState.ALL">选择以过滤</option>
          <option :value="TodoItemState.OPEN">待办中</option>
          <option :value="TodoItemState.DONE">已完成</option>
          <option :value="TodoItemState.DELETE">已删除</option>
        </select>
      </div>
    </div>
  </div>
  <ul class="list-group">
    <li
      class="list-group-item d-flex align-item-center justify-content-between"
      v-for="item in todos"
      @click.stop="check(item)"
      :key="item.id">
      <div class="form-check">
        <input
          :id="item.id"
          type="checkbox"
          class="form-checkinput mr-2"
          :checked="item.state === TodoItemState.DONE"
          :disabled="item.state === TodoItemState.DELETE"
        >
        <label
          :class="{'text-black-50 line-through': item.state === TodoItemState.DONE}"
          @click.prevent.stop="check(item)"
          :for="item.id">{{ item.text }}</label>
      </div>
      <div class="float-right ctrls" :class="{'d-none':item.state!==TodoItemState.OPEN}">
        <button class="btn btn-warning btn-sm mr-2 text-light" @click.stop="edit(item)">编辑</button>
        <button class="btn btn-danger btn-sm" @click.stop="remove(item.id)">删除</button>
      </div>
    </li>
  </ul>
  <button type="button" @click="hide" class="btn btn-danger float-right mt-4">
    {{filterState === TodoItemState.OPEN ? '显示所有':'隐藏已完成'}}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import store from '@/store'
import { TodoItemState } from '@/common/const'
import { TodoItem } from '@/common/interface'
import router from '@/router'

export default defineComponent({
  setup () {
    const inputValue = ref('')
    const filterState = ref(TodoItemState.ALL)
    const add = () => {
      store.commit('ADD', inputValue.value)
    }
    const check = (item: TodoItem) => {
      console.log('check')
      if (item.state === TodoItemState.OPEN || item.state === TodoItemState.DONE) {
        store.commit('CHECK', item.id)
      }
    }

    const remove = (id: string) => {
      console.log('check')
      store.commit('REMOVE', id)
    }

    const edit = (item: TodoItem) => {
      console.log('check')
      store.commit('SAVE_EDIT_ITEM', item)
      router.push({ name: 'edit' })
    }

    const filterItem = (value: TodoItemState) => {
      if (value === TodoItemState.ALL) {
        return store.state.todos
      } else {
        return store.state.todos.filter(item => item.state === value)
      }
    }

    const hide = () => {
      if (filterState.value === TodoItemState.OPEN) {
        filterState.value = TodoItemState.ALL
      } else {
        filterState.value = TodoItemState.OPEN
      }
    }

    return reactive({
      inputValue,
      filterState,
      add,
      todos: computed(() => filterItem(filterState.value)),
      TodoItemState,
      check,
      remove,
      hide,
      edit
    })
  }
})
</script>
<style scoped lang="scss">
.line-through {
  text-decoration: line-through;
}

.list-group-item {
  user-select: none;

  &:hover {
    .ctrls {
      display: block;
    }
  }

  .ctrls {
    display: none;
  }
}
</style>
