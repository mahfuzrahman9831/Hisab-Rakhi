import React from 'react'
import UpdateCustomerFooter from './EditCustomerFooter'
import EditCustomerMain from './EditCustomerForm'
import EditCustomerHeader from './EditCustomerHeader'

export default function EditCustomerPage() {
  return (
    <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>

        <EditCustomerHeader></EditCustomerHeader>
        <EditCustomerMain></EditCustomerMain>
        <UpdateCustomerFooter></UpdateCustomerFooter>
    </div>
  )
}
