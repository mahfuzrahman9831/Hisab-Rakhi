import React, { useState } from "react";
import ProfileAndImportSection from "../assets/Components/Add_Customer_Page/AddCustomerProfile";
import AddCustomerForm from "../assets/Components/Add_Customer_Page/AddCustomerForm";
import AddCustomerFooter from "../assets/Components/Add_Customer_Page/AddCustomerFooter";
import PageHeader from "../assets/Components/Common/Header";
import { useCustomers } from "../Context/CustomerContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../utils/animations";

export default function AddCustomerPage() {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = () => {
    if (!name || !phone) {
      alert("Name and Phone required");
      return;
    }
    const newCustomer = {
      id: Date.now(),
      name, phone, address, profileImage,
      balance: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addCustomer(newCustomer);
    navigate("/success", { state: { customer: newCustomer } });
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24"
    >
      <PageHeader title="Add Customers" backTo="AUTO" />

      {/* ✅ Sections stagger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <ProfileAndImportSection
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.3 }}
      >
        <AddCustomerForm
          name={name} setName={setName}
          phone={phone} setPhone={setPhone}
          address={address} setAddress={setAddress}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.3 }}
      >
        <AddCustomerFooter onSave={handleSubmit} />
      </motion.div>
    </motion.div>
  );
}