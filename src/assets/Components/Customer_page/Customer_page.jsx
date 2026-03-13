import React from 'react'
import Footer_Nav from '../Dashboard/Footer_Nav'
import Customer_list from './Customer_list'
import Search_Sort from './Search_Sort'
import BalanceSummary from './BalanceSummary'
import CustomerHeader from './Customer_Header'

export default function Customer_page() {
  return (
    <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>
       <CustomerHeader></CustomerHeader>
        <BalanceSummary></BalanceSummary>
        <Customer_list></Customer_list>
        <Footer_Nav></Footer_Nav>
    </div>
  )
}
