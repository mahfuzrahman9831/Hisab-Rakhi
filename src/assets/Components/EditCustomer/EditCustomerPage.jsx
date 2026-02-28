import React from "react";
import UpdateCustomerFooter from "./EditCustomerFooter";
import EditCustomerMain from "./EditCustomerForm";
import EditCustomerHeader from "./EditCustomerHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import PageHeader from "../Common/Header";

export default function EditCustomerPage() {

  const { id } = useParams();
  const navigate = useNavigate();

 // ✅ Context থেকে data আনো
  const { customers, setCustomers } = useCustomers();

  // ✅ ID match করো
  const customer = customers.find(
    (c) => c.id === Number(id)
  );

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const handleSave = () => {
    setCustomers(prev =>
      prev.map(c =>
        c.id === customer.id
          ? { ...c, name: customer.name }
          : c
      )
    );

    navigate(-1); // back to previous page
  };

  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
      <PageHeader title={customer.name} backTo="AUTO" />
      <EditCustomerMain customer={customer}></EditCustomerMain>
      <UpdateCustomerFooter onSave={handleSave}></UpdateCustomerFooter>
    </div>
  );
}
