import "./App.css";
import Add_Customer_Page from "./assets/Components/Add_Customer_Page/Add_Customer_Page";
import Customer_page from "./assets/Components/Customer_page/Customer_page";
import Customer_Transaction_report from "./assets/Components/Customer_Transaction_Report/Customer_Transaction_report";
import Dashboard from "./assets/Components/Dashboard/Dashboard";
import Tranactions from "./assets/Components/Dashboard/Tranactions";
import Report_page from "./assets/Components/Reports/Report_page";
import TransactionPage from "./assets/Components/Transaction_Entry/Transaction_Entry_Page";

function App() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Dashboard></Dashboard>
        <Customer_page></Customer_page>
        <Report_page></Report_page>
        <TransactionPage></TransactionPage>
        <Customer_Transaction_report></Customer_Transaction_report>
        <Add_Customer_Page></Add_Customer_Page>
      </div>
    </>
  );
}

export default App;
