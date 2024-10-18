import { getAccessToken, getRefreshToken, saveTokens } from '@/lib/utils'
import { TokensResponse } from '@/types/user'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()



const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = getAccessToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshToken = getRefreshToken()
        if (refreshToken) {
          // Use the refresh token to get a new access token
          const refreshResult = await baseQuery(
            {
              url: '/users/refresh-tokens',
              method: 'POST',
              body: { refresh_token: refreshToken },
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            const { access_token: newAccessToken, refresh_token: newRefreshToken } = refreshResult.data as TokensResponse
            saveTokens(newAccessToken, newRefreshToken) // Save both tokens to local storage

            // Retry the original query with the new access token
            result = await baseQuery(args, api, {
              ...extraOptions,
              headers: {
                ...extraOptions?.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            })
          } else {
            // Handle logout (e.g., dispatch logout action or redirect to login)
            // api.dispatch(loggedOut())
          }
        } else {
          // No refresh token available, handle accordingly (e.g., log out the user)
          // api.dispatch(loggedOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
