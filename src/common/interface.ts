import { TodoItemState } from '@/common/const'

export interface TodoItem {
  id: string;
  text: string;
  state: TodoItemState;
}
