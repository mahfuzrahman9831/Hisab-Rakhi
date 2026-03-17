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




  //  Local State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    profileImage: null,
  });

  // ✅ Load customer data
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

  if (!customer) {
    return <div>Customer not found</div>;
  }


  const isChanged =
  formData.name !== customer.name ||
  formData.phone !== customer.phone ||
  formData.address !== customer.address ||
  formData.profileImage !== customer.profileImage;




  // ✅ Save Function
  const handleSave = () => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id
          ? { ...c,
              ...formData,
              updatedAt: new Date().toISOString(),
          }
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

      <UpdateCustomerFooter 
      onSave={handleSave}
      disabled={!isChanged}
       />
    </div>
  );
}