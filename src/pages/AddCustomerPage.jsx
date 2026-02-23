import React from 'react'
import AddCustomerHeader from '../assets/Components/Add_Customer_Page/AddCustomerHeader'
import ProfileAndImportSection from '../assets/Components/Add_Customer_Page/AddCustomerProfile'
import AddCustomerForm from '../assets/Components/Add_Customer_Page/AddCustomerForm'
import AddCustomerFooter from '../assets/Components/Add_Customer_Page/AddCustomerFooter'

export default function AddCustomerPage() {
  return (
     <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
         <AddCustomerHeader></AddCustomerHeader>
         <ProfileAndImportSection></ProfileAndImportSection>
         <AddCustomerForm></AddCustomerForm>
         <AddCustomerFooter></AddCustomerFooter>
       </div>
  )
}
