import {
  SampleTable,
  PersonalInfoTable,
} from './table.types';

export interface Database {
  sample: SampleTable;
  personal_info: PersonalInfoTable;
}
