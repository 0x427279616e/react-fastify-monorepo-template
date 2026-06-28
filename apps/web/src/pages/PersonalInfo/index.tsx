import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import { get, remove } from '../../services/api';
import { Pencil, Trash2, Plus } from 'lucide-react';

type PersonalInfo = {
   id: number;
   first_name: string;
};

const PersonalInfoList = () => {
   const dispatch = useDispatch();

   const [data, setData] = useState<PersonalInfo[]>([]);

   useEffect(() => {
      dispatch(setPageTitle('Personal Information'));
   }, [dispatch]);

   const fetchData = async () => {};

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   const handleDelete = async (id: number) => {};

   return (
      <div>
         <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white-light">
               Personal Information
            </h2>
            <button className="btn btn-primary">
               <Plus size={18} className="mr-1" />
               Add New
            </button>
         </div>

         <div className="panel bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <div className="table-responsive">
               <table>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th className="w-40">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((item) => (
                        <tr key={item.id}>
                           <td>{item.id}</td>
                           <td>{item.first_name}</td>
                           <td>
                              <div className="flex gap-2">
                                 <button className="btn btn-success btn-sm">
                                    <Pencil size={16} />
                                 </button>
                                 <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(item.id)}
                                 >
                                    <Trash2 size={16} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                     {data.length === 0 && (
                        <tr>
                           <td
                              colSpan={3}
                              className="text-center text-gray-400 py-6"
                           >
                              No records found
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default PersonalInfoList;
