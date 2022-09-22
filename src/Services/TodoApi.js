import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["TODO"],
  endpoints: (builder) => ({
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/posts",
        method: "POST",
        body: JSON.stringify({
          title: todo.title,
          body: todo.body,
          id: todo.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todo"]
    }),
    getAllTodos: builder.query({
      query: () => "/posts",
      providesTags: ["Todo"]

    }),
    updateTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `/posts/1`,
        method: "PUT",
        body: JSON.stringify({
          title: todo.title,
          body: todo.body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todo"]

    }),
    deleteTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `/posts/1`,
        method: "DELETE",
        body: JSON.stringify({
          title: todo.title,
          body: todo.body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todo"]

    }),
  }),
});

//auto generated hook
export const {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
} = todoApi;
