import * as repository from './sample.repository';
import ApiError from '../../apiError';
import { sendResult } from '../../utils/sendResult';
import {
   InsertSample,
   SearchableSample,
   UpdateSample,
} from '@template/shared/model';

export async function search(searchParams: SearchableSample) {
   const result = await repository.search(searchParams);
   return sendResult(result);
}

export async function getById(id: number) {
   const result = await repository.getById(id);

   if (!result) {
      throw new ApiError('Sample not found', 404);
   }

   return sendResult(result);
}

export async function insert(payload: InsertSample) {
   return sendResult(await repository.insert(payload));
}

export async function update(id: number, payload: UpdateSample) {
   return sendResult(await repository.update(id, payload));
}

export async function remove(id: number) {
   return sendResult(await repository.remove(id));
}
