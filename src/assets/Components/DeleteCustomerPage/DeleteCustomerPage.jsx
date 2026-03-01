import { useEffect, useState } from "react";
import DeleteCustomerModal from "./DeleteModal";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";

export default function DeleteCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, setCustomers } = useCustomers();
  const [open, setOpen] = useState(true);

  const customer = customers.find((c) => c.id === Number(id));

  useEffect(() => {
    if (!customer) {
      navigate(-1);
    }
  }, [customer, navigate]);

  const handleDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== Number(id)));
    setOpen(false);
    navigate("/customers"); 
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1); 
  };

  if (!customer) return null;

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