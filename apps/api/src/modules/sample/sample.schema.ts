import {
   SampleSchema,
   PayloadSchema,
   SearchableSampleSchema,
} from '@template/shared/model';
import { Type } from '@sinclair/typebox';

export const search = {
   querystring: SearchableSampleSchema,
   response: {
      200: Type.Array(SampleSchema),
   },
};

export const getById = {
   params: Type.Object({ id: Type.Number() }),
   response: { 200: SampleSchema },
};

export const insert = {
   body: PayloadSchema,
};

export const update = {
   body: PayloadSchema,
   params: Type.Object({ id: Type.Number() }),
};
