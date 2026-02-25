import PageHeader from "../assets/Components/Common/Header";
import Customer_Name from "../assets/Components/Transaction_Entry/Customer_Name";
import Transaction_Form from "../assets/Components/Transaction_Entry/Transaction_Form";
import { useParams } from "react-router-dom";
import { useCustomers } from "../Context/CustomerContext";


export default function CustomerDetails() {
  const { id } = useParams();
  const { customers } = useCustomers();
 const customer = customers.find(c => c.id === Number(id));

  if (!customer) {
    return (
      <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
        <PageHeader title="Customer Details" />
        <p className="text-center mt-4">Customer not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
        <PageHeader title={<span className="text-[15px] font-semibold">{customer.name}</span>}></PageHeader>
        <Customer_Name customer={customer}></Customer_Name>
        <Transaction_Form></Transaction_Form>

        {/* <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] pb-24">
          <PageHeader title="Customer Details" />

          <div className="p-4 space-y-4 bg-white mt-4 rounded-xl shadow-sm">
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="font-semibold">{customer.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p>{customer.phone}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Address</p>
              <p>{customer.address || "No address"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Balance</p>
              <p className="text-lg font-bold">৳ {customer.balance}</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
