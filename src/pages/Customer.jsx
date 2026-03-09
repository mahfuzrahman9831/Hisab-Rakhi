import React from 'react'
import BalanceSummary from '../assets/Components/Customer_page/BalanceSummary'
import Customer_list from '../assets/Components/Customer_page/Customer_list'
import Header from '../assets/Components/Common/Header'
import { getCustomerBalance } from "../utils/ledger";



export default function Customer() {
  return (
    <div className='max-w-[380px] mx-auto w-full pb-24'>
          <Header title="Customers" backTo="AUTO"></Header>
           <BalanceSummary></BalanceSummary>
           <Customer_list></Customer_list>
       </div>
  )
}
