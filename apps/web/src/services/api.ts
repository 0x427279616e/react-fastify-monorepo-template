import { createApi } from '@shared/axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || '';

export const {
   api,
   get,
   post,
   put,
   patch,
   delete: remove,
} = createApi(apiBaseUrl);

export type { ApiResponse, ApiError } from '@shared/axios';
