import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormField from '../../components/form/FormField';

type PersonalInfo = {
   id: number;
   name: string;
};

const PersonalInfoForm = () => {
   const dispatch = useDispatch();
   const [formValue, setFormValue] = useState('');

   useEffect(() => {}, []);

   // use this to handle form submit
   const handleSubmit = async () => {};

   return (
      <div>
         <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white-light">
               Personal Information Form
            </h2>
         </div>

         <div className="panel bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm max-w-lg">
            <FormField
               name="name"
               label="Full Name"
               placeholder="Enter full name"
               required
            />
            <div className="flex justify-end gap-2 pt-4">
               <button className="btn btn-secondary">Cancel</button>
               <button className="btn btn-primary">Submit</button>
            </div>
         </div>
      </div>
   );
};

export default PersonalInfoForm;
