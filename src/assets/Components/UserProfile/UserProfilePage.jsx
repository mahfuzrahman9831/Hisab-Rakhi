import React, { useRef } from 'react'
import SaveFooter from './UserProfileFooter'
import ProfilePage from './UserProfileSection'
import PageHeader from '../Common/Header'
import { motion } from "framer-motion"; // ✅
import { pageVariants, pageTransition } from "../../../utils/animations"; // ✅

export default function UserProfilePage() {

  const saveRef = useRef(null)

  const handleSave = () => {
    if (saveRef.current) {
      saveRef.current()
    }
  }

  return (
    // ✅ Page transition
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'
    >
      <PageHeader title="Profile" backTo="AUTO" />

      {/* ✅ ProfilePage slide up */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      >
        <ProfilePage onSaveRef={saveRef} />
      </motion.div>

      {/* ✅ SaveFooter slide up */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <SaveFooter onSave={handleSave} />
      </motion.div>
    </motion.div>
  )
}