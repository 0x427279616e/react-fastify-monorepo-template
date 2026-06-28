import { Type, Static } from '@sinclair/typebox';
import { StrictObject } from './strict-object';

export const PersonalInfoSchema = StrictObject({
   id: Type.Optional(Type.Number()),
   first_name: Type.String(),
   last_name: Type.String(),
   email: Type.String(),
   phone: Type.String(),
   address: Type.String(),
   city: Type.String(),
});

export const SearchablePersonalInfoSchema = Type.Object({
   id: Type.Optional(Type.Number()),
});

export const PersonalInfoPayloadSchema = StrictObject({
   id: Type.Optional(Type.Number()),
   first_name: Type.String(),
   last_name: Type.String(),
   email: Type.String(),
   phone: Type.String(),
   address: Type.String(),
   city: Type.String(),
});

export type SearchablePersonalInfo = Static<
   typeof SearchablePersonalInfoSchema
>;
export type PersonalInfo = Static<typeof PersonalInfoSchema>;
export type InsertPersonalInfo = Static<typeof PersonalInfoPayloadSchema>;
export type UpdatePersonalInfo = Static<typeof PersonalInfoPayloadSchema>;
