import { Type, Static } from '@sinclair/typebox';
import { StrictObject } from './strict-object';

export const SampleSchema = StrictObject({
   id: Type.Optional(Type.Number()),
   sample: Type.String(),
});

export const SearchableSampleSchema = Type.Object({
   id: Type.Optional(Type.Number()),
});

export const PayloadSchema = StrictObject({
   sample: Type.String(),
});

export type SearchableSample = Static<typeof SearchableSampleSchema>;
export type Sample = Static<typeof SampleSchema>;
export type InsertSample = Static<typeof PayloadSchema>;
export type UpdateSample = Static<typeof PayloadSchema>;
