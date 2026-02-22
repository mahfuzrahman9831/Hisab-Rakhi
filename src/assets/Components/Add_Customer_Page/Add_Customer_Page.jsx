import AddCustomerFooter from "./AddCustomerFooter";
import AddCustomerForm from "./AddCustomerForm";
import AddCustomerHeader from "./AddCustomerHeader";
import ProfileAndImportSection from "./AddCustomerProfile";


export default function Add_Customer_Page() {
  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
       

    <AddCustomerHeader></AddCustomerHeader>
       <ProfileAndImportSection></ProfileAndImportSection>
       <AddCustomerForm></AddCustomerForm>
        <AddCustomerFooter></AddCustomerFooter>
    </div>
  )
}
