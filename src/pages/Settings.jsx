import React from 'react'
import SettingsMainSection from '../assets/Components/SettingPage/SettingsMainSection'
import Header from '../assets/Components/Common/Header'
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../utils/animations";

export default function Settings() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className='max-w-[380px] mx-auto w-full pb-24'
    >
      <Header title="Settings" backTo="AUTO" />
      <SettingsMainSection />
    </motion.div>
  );
}