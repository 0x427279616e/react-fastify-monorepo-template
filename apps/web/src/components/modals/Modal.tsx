import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ModalProps = {
   isOpen: boolean;
   onClose: () => void;
   title?: string;
   children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={onClose}
            >
               <motion.div
                  className="w-full max-w-lg rounded-2xl bg-white shadow-xl dark:bg-slate-900"
                  initial={{ scale: 0.9, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title || 'Modal'}</h2>
                     <button onClick={onClose} className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <X size={18} />
                     </button>
                  </div>
                  <div className="px-6 py-4">{children}</div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default Modal;
