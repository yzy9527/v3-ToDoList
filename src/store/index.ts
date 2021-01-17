import { createStore } from 'vuex'
import { TodoItem } from '@/common/interface'
import { TodoItemState } from '@/common/const'
import { v4 as uuidv4 } from 'uuid'

export default createStore({
  state: {
    todos: [] as TodoItem[]
  },
  mutations: {
    ADD(state, value) {
      state.todos.push({
        id: uuidv4(),
        text: value,
        state: TodoItemState.OPEN
      })
    },
    CHECK(state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos[index].state =
        state.todos[index].state === TodoItemState.DONE
          ? TodoItemState.OPEN
          : TodoItemState.DONE
    }
  },
  actions: {},
  modules: {}
})
