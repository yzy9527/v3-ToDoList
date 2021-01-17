import { createStore, Store } from 'vuex'
import { TodoItem } from '@/common/interface'
import { TodoItemState } from '@/common/const'
import { v4 as uuidv4 } from 'uuid'
import { storage } from '@/common/utils'

const savaPlugin = (
  store: Store<{
    todos: TodoItem[];
    item: TodoItem;
  }>
) => {
  store.state.todos = storage.get()
  // store.commit('INIT',storage.get())
  store.subscribe((mutation, state) => {
    storage.set(state.todos)
  })
}

export default createStore({
  state: {
    todos: [] as TodoItem[],
    item: {} as TodoItem
  },
  mutations: {
    // INIT(state,todos){
    //
    // },
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
    },
    REMOVE(state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos[index].state = TodoItemState.DELETE
    },
    CLEAR(state, type: TodoItemState) {
      state.todos = state.todos.filter(item => item.state !== type)
    },
    SAVE_EDIT_ITEM(state, item: TodoItem) {
      state.item = item
    },
    UPDATE(state, item: TodoItem) {
      const index = state.todos.findIndex(i => i.id === item.id)
      state.todos[index] = item
    }
  },
  actions: {},
  modules: {},
  getters: {
    dones: state =>
      state.todos.filter(item => item.state === TodoItemState.DONE),
    deletes: state =>
      state.todos.filter(item => item.state === TodoItemState.DELETE),
    opens: state =>
      state.todos.filter(item => item.state === TodoItemState.OPEN)
  },
  plugins: [savaPlugin]
})
