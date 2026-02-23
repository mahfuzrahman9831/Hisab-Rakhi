import React from 'react'
import BalanceSummary from '../assets/Components/Customer_page/BalanceSummary'
import Search_Sort from '../assets/Components/Customer_page/Search_Sort'
import Customer_list from '../assets/Components/Customer_page/Customer_list'
import Header from '../assets/Components/Common/Header'


console.log("Customer Header:", Header);


export default function Customer() {
  return (
    <div className='max-w-[380px] mx-auto w-full pb-24'>
          <Header title="Customers" backTo="/"></Header>
           <BalanceSummary></BalanceSummary>
           <Search_Sort></Search_Sort>
           <Customer_list></Customer_list>
            {/* <button className="absolute right-6 bottom-14 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center z-40 transition active:scale-95">
             <span className="text-3xl font-bold leading-none">+</span>
           </button> */}
           {/* <Add_Customer_Btn></Add_Customer_Btn> */}
           {/* <Footer_Nav></Footer_Nav> */}
       </div>
  )
}
