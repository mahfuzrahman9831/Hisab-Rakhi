import "./App.css";
import Customer_page from "./assets/Components/Customer_page/Customer_page";
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
      </div>
    </>
  );
}

export default App;
