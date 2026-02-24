import React from "react";
import ProfileAndImportSection from "../assets/Components/Add_Customer_Page/AddCustomerProfile";
import AddCustomerForm from "../assets/Components/Add_Customer_Page/AddCustomerForm";
import AddCustomerFooter from "../assets/Components/Add_Customer_Page/AddCustomerFooter";
import PageHeader from "../assets/Components/Common/Header";
import { useState } from "react";
import { useCustomers } from "../Context/CustomerContext";
import { useNavigate } from "react-router-dom";

export default function AddCustomerPage() {
  const { addCustomer } = useCustomers();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Address:", address);
    if (!name || !phone) {
      alert("Name and Phone required");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      phone,
      address,
      balance: 0,
    };

    addCustomer(newCustomer);
    navigate("/customer");
  };

  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
      <PageHeader title="Add Customers" backTo="/"></PageHeader>
      <ProfileAndImportSection></ProfileAndImportSection>
      <AddCustomerForm   
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}>
          </AddCustomerForm>
          <AddCustomerFooter onSave={handleSubmit}></AddCustomerFooter>
    </div>
  );
}
