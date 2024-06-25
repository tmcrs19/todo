import { RootState } from "@faceit/lib/redux/store";

export const selectTodos = (state: RootState) => state.todo.todos;
