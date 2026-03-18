import React from 'react'
import BalanceSummary from '../assets/Components/Customer_page/BalanceSummary'
import Customer_list from '../assets/Components/Customer_page/Customer_list'
import Header from '../assets/Components/Common/Header'
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../utils/animations";



export default function Customer() {
  return (
     <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
    <div className='max-w-[380px] mx-auto w-full pb-24'>
          <Header title="Customers" backTo="AUTO"></Header>
           <BalanceSummary></BalanceSummary>
           <Customer_list></Customer_list>
       </div>
       </motion.div>
  )
}
