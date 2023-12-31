import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../Api/ApiSlice";

const dishesAdapter = createEntityAdapter({
  selectId: (dish) => dish._id
});

const initialState = dishesAdapter.getInitialState();

export const dishesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDishes: builder.query({
      query: () => "/products",
      transformResponse: (responseData) => {
        return dishesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => [
        { type: "Dishes", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Dishes", id })),
      ],
    }),

    getDishesBycategoryId: builder.query({
      query: (categoryId) => `/products?category=${categoryId}`,
      transformResponse: (responseData) => {
        return dishesAdapter.upsertMany(initialState,responseData);
      },
      providesTags: (result) => [
        { type: "Dishes", id: "LIST" },
        ...(result?.ids ? result.ids.map((id) => ({ type: "Dishes", id })) : []),
      ],
    }),

    getDishById: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (responseData) => {
        return dishesAdapter.setAll(initialState, [responseData]);
      },
      providesTags: (result) => [
        ...result.ids.map((id) => ({ type: "Dishes", id })),
      ],
    }),
  })
});

export const { useGetDishesQuery , useGetDishByIdQuery , useGetDishesBycategoryIdQuery} = dishesApiSlice;
