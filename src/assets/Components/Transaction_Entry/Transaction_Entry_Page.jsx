import BottomSubmit from "./BottomSubmit";
import Customer_Name from "./Customer_Name";
import NewEntryHeader from "./NewEntryHeader";
import Transaction_Form from "./Transaction_Form";

export default function TransactionPage() {
  return (
    <>
      <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
        <NewEntryHeader></NewEntryHeader>
        <Customer_Name></Customer_Name>
        <Transaction_Form></Transaction_Form>
        <BottomSubmit></BottomSubmit>
      </div>
    </>
  );
}
