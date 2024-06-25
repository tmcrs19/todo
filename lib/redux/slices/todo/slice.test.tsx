import todoReducer, {
  addTodo,
  deleteTodo,
  toggleTodo,
  setTodos,
} from "./slice";

const mockTodos = [
  { id: 1, title: "Wash the car", isCompleted: false },
  { id: 2, title: "Mow the lawn", isCompleted: false },
  { id: 3, title: "Do the washing-up", isCompleted: false },
];

describe("todo slice", () => {
  const initialState = {
    todos: [],
  };

  it("should handle initial state", () => {
    expect(todoReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addTodo", () => {
    const newTodo = { id: 4, title: "Read a book", isCompleted: false };
    const actual = todoReducer(initialState, addTodo(newTodo));
    expect(actual.todos).toEqual([newTodo]);
  });

  it("should handle deleteTodo", () => {
    const stateWithTodos = { todos: mockTodos };
    const actual = todoReducer(stateWithTodos, deleteTodo(1));
    expect(actual.todos).toEqual([
      { id: 2, title: "Mow the lawn", isCompleted: false },
      { id: 3, title: "Do the washing-up", isCompleted: false },
    ]);
  });

  it("should handle toggleTodo", () => {
    const stateWithTodos = { todos: mockTodos };
    const actual = todoReducer(stateWithTodos, toggleTodo(1));
    expect(actual.todos).toEqual([
      { id: 1, title: "Wash the car", isCompleted: true },
      { id: 2, title: "Mow the lawn", isCompleted: false },
      { id: 3, title: "Do the washing-up", isCompleted: false },
    ]);
  });

  it("should handle setTodos", () => {
    const actual = todoReducer(initialState, setTodos(mockTodos));
    expect(actual.todos).toEqual(mockTodos);
  });
});
