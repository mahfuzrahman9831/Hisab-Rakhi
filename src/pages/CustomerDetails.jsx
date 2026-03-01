import PageHeader from "../assets/Components/Common/Header";
import Customer_Name from "../assets/Components/Transaction_Entry/Customer_Name";
import Transaction_Form from "../assets/Components/Transaction_Entry/Transaction_Form";
import { useParams } from "react-router-dom";
import { useCustomers } from "../Context/CustomerContext";
import { IoChevronBack, IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";


export default function CustomerDetails() {
  const { id } = useParams();
  const { customers } = useCustomers();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const customer = customers.find(c => c.id === Number(id));

     // Click outside close
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        Customer not found
      </div>
    );
  }



  return (
    <div className="relative flex flex-col h-full max-w-[380px] mx-auto bg-[#f3f4f6]">

      {/* HEADER */}
      <PageHeader
        title={<span className="text-[15px] font-semibold">{customer.name}</span>}
        backTo="AUTO"
        showMenu={true}
          onDelete={() => navigate(`/customer/${customer.id}/delete`)}
          onEdit={() => navigate(`/customer/${customer.id}/edit`)}
          onReport={() => navigate(`/customer/${customer.id}/report`)}
        
      />

      {/* CONTENT (NO SCROLL) */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <Customer_Name customer={customer} />
        <Transaction_Form />
      </div>

      {/* FIXED SUBMIT BUTTON */}
      <div className="sticky bottom-16 px-4 pb-4 bg-[#f3f4f6]">
        <button
          onClick={() => {
            // এখানে handleSubmit call করবে
          }}
          className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all text-white h-14 rounded-xl font-bold text-lg shadow-lg"
        >
          Submit
        </button>
      </div>

    </div>
  );
}
