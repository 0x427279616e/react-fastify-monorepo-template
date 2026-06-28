import { Generated } from 'kysely';

export type SampleTable = {
   id: Generated<number>;
   sample: string;
};

export type PersonalInfoTable = {
   id: Generated<number>;
   name: string;
};
