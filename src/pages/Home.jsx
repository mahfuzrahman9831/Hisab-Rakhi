import React from "react";
import Group_Business from "../assets/Components/Dashboard/Group_Business";
import Summary_Cards from "../assets/Components/Dashboard/Summary_Cards";
import Tranactions from "../assets/Components/Dashboard/Tranactions";
import PageHeader from "../assets/Components/Common/Header";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../utils/animations";




export default function Home() {

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
      <div className="pb-24">
        <PageHeader title="Dashboard" showBack={false}></PageHeader>
        <Group_Business></Group_Business>
        <Summary_Cards></Summary_Cards>
        <Tranactions></Tranactions>
      </div>
    </div>
    </motion.div>
  );
}
