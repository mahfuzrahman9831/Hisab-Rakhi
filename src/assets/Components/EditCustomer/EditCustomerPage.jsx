import React, { useState, useEffect } from "react";
import UpdateCustomerFooter from "./EditCustomerFooter";
import EditCustomerMain from "./EditCustomerForm";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import PageHeader from "../Common/Header";
import { motion } from "framer-motion"; // ✅
import { pageVariants, pageTransition } from "../../../utils/animations"; // ✅

export default function EditCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, setCustomers } = useCustomers();

  const customer = customers.find((c) => c.id === Number(id));

  const [formData, setFormData] = useState({
    name: "", phone: "", address: "", profileImage: null,
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        phone: customer.phone || "",
        address: customer.address || "",
        profileImage: customer.profileImage || null,
      });
    }
  }, [customer]);

  if (!customer) return <div>Customer not found</div>;

  const isChanged =
    formData.name !== customer.name ||
    formData.phone !== customer.phone ||
    formData.address !== customer.address ||
    formData.profileImage !== customer.profileImage;

  const handleSave = () => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id
          ? { ...c, ...formData, updatedAt: new Date().toISOString() }
          : c
      )
    );
    navigate(-1);
  };

  return (
    // ✅ Page transition
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24"
    >
      <PageHeader title="Edit Customer" backTo="AUTO" />

      {/* ✅ Form slide up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
      >
        <EditCustomerMain formData={formData} setFormData={setFormData} />
      </motion.div>

      {/* ✅ Footer slide up */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <UpdateCustomerFooter onSave={handleSave} disabled={!isChanged} />
      </motion.div>
    </motion.div>
  );
}