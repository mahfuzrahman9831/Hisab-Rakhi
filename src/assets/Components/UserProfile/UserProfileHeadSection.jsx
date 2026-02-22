import React from 'react'
import { FiCamera } from 'react-icons/fi'

export default function UserProfileHeadSection() {
  return (
    <div className="flex p-6">
           <div className="flex w-full flex-col gap-4 items-center">
   
             <div className="relative">
               <img
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT5j47Pnqm0lqadDeNfnUypp1NXrOTioJIj0cVEIlYajxPWtu3FLHVIS_LprDLXw3Z_cWKvAcluwiUqTmJ-ODgKB4vAlJmpH7hMgkzJSroYQfyrdYI2KFUO8u0Rzvu1onqMSxjBA0VSqVLKjtnrpCfdu5HD_ZRRHzpS8c8zWjaIRdbCB6KkjK-XGipTXkeVdkvLXvVgMAT34QuSFIgJz1dh-hjg-a7WvPY9z1sd0xQZsI4bAgZbAPoXNz_JG7XhJ4-uKZsCFeEgR8O"
                 alt="Profile"
                 className="w-28 h-28 rounded-full object-cover border-4 border-green-200"
               />
   
               <button className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-md">
                 <FiCamera size={16} />
               </button>
             </div>
   
             <div className="text-center">
               <p className="text-[22px] font-bold">
                 Alex Johnson
               </p>
               <p className="text-gray-500 text-base">
                 alex.johnson@business.com
               </p>
             </div>
   
           </div>
         </div>
  )
}
