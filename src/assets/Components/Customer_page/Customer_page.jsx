import React from 'react'
import Footer_Nav from '../Dashboard/Footer_Nav'
import Add_Customer_Btn from './Add_Customer_Btn'
import Customer_list from './Customer_list'
import Search_Sort from './Search_Sort'
import BalanceSummary from './BalanceSummary'
import CustomerHeader from './Customer_Header'

export default function Customer_page() {
  return (
    <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>
       <CustomerHeader></CustomerHeader>
        <BalanceSummary></BalanceSummary>
        <Search_Sort></Search_Sort>
        <Customer_list></Customer_list>
         <button className="absolute right-6 bottom-14 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center z-40 transition active:scale-95">
          <span className="text-3xl font-bold leading-none">+</span>
        </button>
        {/* <Add_Customer_Btn></Add_Customer_Btn> */}
        <Footer_Nav></Footer_Nav>
    </div>
  )
}
