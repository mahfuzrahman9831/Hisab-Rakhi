import { useState } from "react";
import DeleteCustomerModal from "./DeleteModal";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";

export default function DeleteCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, deleteCustomer } = useCustomers(); // ✅ একসাথে
  const [open, setOpen] = useState(true);

  const customer = customers.find((c) => c.id === Number(id));

  if (!customer) {
    navigate("/customer", { replace: true });
    return null;
  }

  const handleDelete = () => {
    deleteCustomer(Number(id)); // ✅ trash এ যাবে
    navigate("/customer", { replace: true });
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DeleteCustomerModal
        open={open}
        onClose={handleClose}
        onConfirm={handleDelete}
        customerName={customer.name}
      />
    </div>
  );
}