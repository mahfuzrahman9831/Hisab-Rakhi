import { createContext, useContext, useEffect, useState } from "react";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState(() => {
    const stored = localStorage.getItem("customers");
    return stored ? JSON.parse(stored) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  // 🔥 Save customers to localStorage
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  // 🔥 Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

// 🔥 delete transactions from localStorage
  useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}, [transactions]);

  const addCustomer = (customer) => {
    setCustomers((prev) => [...prev, customer]);
  };

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };


  const toggleFavoriteCustomer = (id) => {
  setCustomers((prev) =>
    prev.map((c) =>
      c.id === id
        ? { ...c, favorite: !c.favorite }
        : c
    )
  );
};


const deleteTransaction = (id) => {
  setTransactions((prev) =>
    prev.filter((t) => t.id !== id)
  );
};

const updateTransaction = (updatedTxn) => {
  setTransactions((prev) =>
    prev.map((t) =>
      t.id === updatedTxn.id ? updatedTxn : t
    )
  );
};
  


  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
        transactions,
        addCustomer,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        toggleFavoriteCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  return useContext(CustomerContext);
}