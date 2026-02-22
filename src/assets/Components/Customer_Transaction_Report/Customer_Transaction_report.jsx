import React from 'react'
import BottomSubmit from './BottomSubmit'
import LedgerPage from './LedgerPage'
import Customer_Transaction_Header from './Customer_Transaction_Header'

export default function Customer_Transaction_report() {
  return (
    <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>
        <Customer_Transaction_Header></Customer_Transaction_Header>
        <LedgerPage></LedgerPage>
        <BottomSubmit></BottomSubmit>
    </div>
  )
}
