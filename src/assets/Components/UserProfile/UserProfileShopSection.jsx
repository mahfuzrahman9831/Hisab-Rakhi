import React from 'react'
import { FiMapPin } from 'react-icons/fi'

export default function UserProfileShopSection() {
  return (
     <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
   
             {/* Shop Preview */}
             <div className="p-4 flex gap-4">
               <img
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNtksEcRj6vGLpTnEvtAX6v2FTAAErtgk5NgctOnNF_PDdJ2rFC2LciRGacCGHYWJ_LJqrijVnIuaE-nHL1beODVuCaDKBmiAfmh5ysq0imSWt2FBxDLKLjPHXH_eFxAt5Mi4dO3S2NsY3OUiDQc_4LrHSc9OD_OXBO1GcktcfDHDWVrE2lsxBtU9kdL1q87FgJrNoIuBqtKcNufipsVCSB5__x0Iq16p35rXeKzXDYH2mTq4vd2dWD2etvwMUWZF8CLtmczCLKXv3"
                 alt="Shop"
                 className="w-20 h-20 rounded-lg object-cover"
               />
   
               <div className="flex flex-col justify-center">
                 <p className="text-xs font-medium uppercase text-gray-500">
                   Shop Name
                 </p>
                 <p className="text-lg font-bold">
                   Green Grocery
                 </p>
                 <p className="text-gray-500 text-sm">
                   Retail • Founded 2021
                 </p>
               </div>
             </div>
   
             {/* Address */}
             <div className="px-4 pb-4">
               <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
                 <div className="text-green-600 bg-green-100 p-2 rounded-lg">
                   <FiMapPin size={18} />
                 </div>
   
                 <div>
                   <p className="text-xs uppercase text-gray-500 font-medium">
                     Business Address
                   </p>
                   <p className="text-sm font-medium">
                     123 Business St, New York, NY 10001
                   </p>
                 </div>
               </div>
             </div>
   
           </div>
  )
}
