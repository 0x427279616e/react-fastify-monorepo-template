import {
   PersonalInfoSchema,
   PersonalInfoPayloadSchema,
   SearchablePersonalInfoSchema,
} from '@template/shared/model';
import { Type } from '@sinclair/typebox';

export const search = {
   querystring: SearchablePersonalInfoSchema,
   response: {
      200: Type.Array(PersonalInfoSchema),
   },
};

export const getById = {
   params: Type.Object({ id: Type.Number() }),
   response: { 200: PersonalInfoSchema },
};

export const insert = {
   body: PersonalInfoPayloadSchema,
};

export const update = {
   body: PersonalInfoPayloadSchema,
   params: Type.Object({ id: Type.Number() }),
};
