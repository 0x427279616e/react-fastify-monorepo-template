import * as repository from './personal-info.repository';
import ApiError from '../../apiError';
import { sendResult } from '../../utils/sendResult';
import type {
   InsertPersonalInfo,
   SearchablePersonalInfo,
   UpdatePersonalInfo,
} from '@template/shared/model';

export async function search(searchParams: SearchablePersonalInfo) {
   const result = await repository.search(searchParams);
   return sendResult(result);
}

export async function getById(id: number) {
   const result = await repository.getById(id);

   if (!result) {
      throw new ApiError('Personal info not found', 404);
   }

   return sendResult(result);
}

export async function insert(payload: InsertPersonalInfo) {
   return sendResult(await repository.insert(payload));
}

export async function update(id: number, payload: UpdatePersonalInfo) {
   return sendResult(await repository.update(id, payload));
}

export async function remove(id: number) {
   return sendResult(await repository.remove(id));
}
