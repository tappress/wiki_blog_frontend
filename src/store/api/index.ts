import { baseQueryWithReauth } from "@/store/api/custom-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "User",
  ],
});

export { api };
