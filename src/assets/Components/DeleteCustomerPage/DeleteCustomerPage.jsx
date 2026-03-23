import { useState } from "react";
import DeleteCustomerModal from "./DeleteModal";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import PinVerifyModal from "../Common/PinVerifyModal";
import { motion, AnimatePresence } from "framer-motion"; // ✅
import { pageVariants, pageTransition } from "../../../utils/animations"; // ✅

export default function DeleteCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, deleteCustomer } = useCustomers();

  const [showPinModal, setShowPinModal] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const customer = customers.find((c) => c.id === Number(id));

  if (!customer) {
    navigate("/customer", { replace: true });
    return null;
  }

  const handlePinSuccess = () => {
    setShowPinModal(false);
    setShowDeleteModal(true);
  };

  const handlePinCancel = () => navigate(-1);

  const handleDelete = () => {
    deleteCustomer(Number(id));
    navigate("/customer", { replace: true });
  };

  const handleClose = () => {
    setShowDeleteModal(false);
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
      className="min-h-screen bg-gray-100"
    >
      {/* ✅ Step 1 — PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <PinVerifyModal
            title="কাস্টমার ডিলিট নিশ্চিত করুন"
            onSuccess={handlePinSuccess}
            onCancel={handlePinCancel}
          />
        )}
      </AnimatePresence>

      {/* ✅ Step 2 — Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteCustomerModal
            open={showDeleteModal}
            onClose={handleClose}
            onConfirm={handleDelete}
            customerName={customer.name}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}