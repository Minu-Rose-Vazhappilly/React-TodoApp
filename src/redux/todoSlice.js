// redux/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTodoList, deleteTodoList, editTodoList, todoList } from "../services/allAPI";

// Async actions
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await todoList();
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTask) => {
  await addTodoList(newTask);
  const response = await todoList();
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await deleteTodoList(id);
  const response = await todoList();
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, updatedTask }) => {
    await editTodoList(id, updatedTask);
    const response = await todoList();
    return response.data;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default todoSlice.reducer;
