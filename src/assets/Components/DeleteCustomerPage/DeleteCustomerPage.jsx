import { useState } from "react";
import DeleteCustomerModal from "./DeleteModal";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import PinVerifyModal from "../Common/PinVerifyModal"; // ✅

export default function DeleteCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, deleteCustomer } = useCustomers();

  const [showPinModal, setShowPinModal] = useState(true); // ✅ পেজ খুললেই PIN modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ PIN সঠিক হলে delete modal

  const customer = customers.find((c) => c.id === Number(id));

  if (!customer) {
    navigate("/customer", { replace: true });
    return null;
  }

  // ✅ PIN সঠিক হলে delete modal দেখাও
  const handlePinSuccess = () => {
    setShowPinModal(false);
    setShowDeleteModal(true);
  };

  // ✅ PIN বাতিল করলে আগের পেজে ফিরে যাও
  const handlePinCancel = () => {
    navigate(-1);
  };

  // ✅ Delete confirm
  const handleDelete = () => {
    deleteCustomer(Number(id));
    navigate("/customer", { replace: true });
  };

  // ✅ Delete cancel
  const handleClose = () => {
    setShowDeleteModal(false);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ✅ Step 1 — PIN Verify */}
      {showPinModal && (
        <PinVerifyModal
          title="কাস্টমার ডিলিট নিশ্চিত করুন"
          onSuccess={handlePinSuccess}
          onCancel={handlePinCancel}
        />
      )}

      {/* ✅ Step 2 — Delete Confirm */}
      {showDeleteModal && (
        <DeleteCustomerModal
          open={showDeleteModal}
          onClose={handleClose}
          onConfirm={handleDelete}
          customerName={customer.name}
        />
      )}
    </div>
  );
}