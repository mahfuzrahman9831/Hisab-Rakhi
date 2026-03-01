import React, { useState, useEffect } from "react";
import UpdateCustomerFooter from "./EditCustomerFooter";
import EditCustomerMain from "./EditCustomerForm";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import PageHeader from "../Common/Header";

export default function EditCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, setCustomers } = useCustomers();

  const customer = customers.find(
    (c) => c.id === Number(id)
  );

  // 🔥 Local State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // ✅ Load customer data
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        phone: customer.phone || "",
        address: customer.address || "",
      });
    }
  }, [customer]);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  // ✅ Save Function
  const handleSave = () => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id
          ? { ...c, ...formData }
          : c
      )
    );

    navigate(-1);
  };

  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
      
      <PageHeader title="Edit Customer" backTo="AUTO" />

      <EditCustomerMain
        formData={formData}
        setFormData={setFormData}
      />

      <UpdateCustomerFooter onSave={handleSave} />
    </div>
  );
}