import { createContext, useContext, useEffect, useState } from "react";
import { useBusiness } from "./BusinessContext"; // ✅ যোগ করো

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const { activeBusinessId } = useBusiness(); // ✅ active business জানো

  // ✅ প্রতিটা business এর আলাদা key
  const customersKey = `customers_${activeBusinessId}`;
  const transactionsKey = `transactions_${activeBusinessId}`;

  const [customers, setCustomers] = useState(() => {
    // ✅ পুরনো data migrate করো (প্রথমবার)
    if (activeBusinessId === "biz_default") {
      const old = localStorage.getItem("customers");
      if (old) return JSON.parse(old);
    }
    const stored = localStorage.getItem(customersKey);
    return stored ? JSON.parse(stored) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    if (activeBusinessId === "biz_default") {
      const old = localStorage.getItem("transactions");
      if (old) return JSON.parse(old);
    }
    const stored = localStorage.getItem(transactionsKey);
    return stored ? JSON.parse(stored) : [];
  });

  const [trashedTransactions, setTrashedTransactions] = useState(() => {
    const stored = localStorage.getItem(`trash_${activeBusinessId}`);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      `trash_${activeBusinessId}`,
      JSON.stringify(trashedTransactions),
    );
  }, [trashedTransactions, activeBusinessId]);

  // ✅ deleteTransaction — permanent delete এর বদলে trash এ পাঠাও
  const deleteTransaction = (id) => {
    const txn = transactions.find((t) => t.id === id);
    if (txn) {
      setTrashedTransactions((prev) => [
        ...prev,
        { ...txn, deletedAt: new Date().toISOString() }, // ✅ কখন delete হয়েছে
      ]);
    }
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ Restore from trash
  const restoreTransaction = (id) => {
    const txn = trashedTransactions.find((t) => t.id === id);
    if (txn) {
      const { deletedAt, ...original } = txn;
      addTransaction(original);
      setTrashedTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // ✅ Permanent delete from trash
  const permanentDelete = (id) => {
    setTrashedTransactions((prev) => prev.filter((t) => t.id !== id));
  };


  // ✅ trashedCustomers state Add
const [trashedCustomers, setTrashedCustomers] = useState(() => {
  const stored = localStorage.getItem(`trash_customers_${activeBusinessId}`);
  return stored ? JSON.parse(stored) : [];
});

useEffect(() => {
  localStorage.setItem(`trash_customers_${activeBusinessId}`, JSON.stringify(trashedCustomers));
}, [trashedCustomers, activeBusinessId]);


// ✅ ৩০ দিন পুরনো customer trash অটো ডিলিট
useEffect(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  setTrashedCustomers((prev) =>
    prev.filter((c) => new Date(c.deletedAt) > thirtyDaysAgo)
  );
}, []);

// ✅ deleteCustomer — customer + তার সব transaction trash এ
const deleteCustomer = (id) => {
  const customer = customers.find((c) => c.id === id);
  const customerTxns = transactions.filter((t) => t.customerId === id);

  if (customer) {
    setTrashedCustomers((prev) => [
      ...prev,
      {
        ...customer,
        trashedTransactions: customerTxns,
        deletedAt: new Date().toISOString(),
      },
    ]);
  }

  setCustomers((prev) => prev.filter((c) => c.id !== id));
  setTransactions((prev) => prev.filter((t) => t.customerId !== id));
};

// ✅ restoreCustomer
const restoreCustomer = (id) => {
  const trashedCust = trashedCustomers.find((c) => c.id === id);
  if (!trashedCust) return;

  const { trashedTransactions: txns, deletedAt, ...customerData } = trashedCust;

  setCustomers((prev) => [...prev, customerData]);
  if (txns?.length > 0) {
    setTransactions((prev) => [...prev, ...txns]);
  }
  setTrashedCustomers((prev) => prev.filter((c) => c.id !== id));
};

// ✅ permanentDeleteCustomer
const permanentDeleteCustomer = (id) => {
  setTrashedCustomers((prev) => prev.filter((c) => c.id !== id));
};




  // ✅ Business switch হলে নতুন data লোড করো
  useEffect(() => {
    if (activeBusinessId === "biz_default") {
      const old = localStorage.getItem("customers");
      setCustomers(old ? JSON.parse(old) : []);
      const oldTxns = localStorage.getItem("transactions");
      setTransactions(oldTxns ? JSON.parse(oldTxns) : []);
    } else {
      const stored = localStorage.getItem(customersKey);
      setCustomers(stored ? JSON.parse(stored) : []);
      const storedTxns = localStorage.getItem(transactionsKey);
      setTransactions(storedTxns ? JSON.parse(storedTxns) : []);
    }
  }, [activeBusinessId]); // ✅ activeBusinessId বদলালে reload

  useEffect(() => {
    localStorage.setItem(customersKey, JSON.stringify(customers));
  }, [customers, customersKey]);

  useEffect(() => {
    localStorage.setItem(transactionsKey, JSON.stringify(transactions));
  }, [transactions, transactionsKey]);

  const addCustomer = (customer) => setCustomers((prev) => [...prev, customer]);
  const addTransaction = (transaction) =>
    setTransactions((prev) => [...prev, transaction]);

  const updateTransaction = (updatedTxn) =>
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTxn.id ? updatedTxn : t)),
    );
  const toggleFavoriteCustomer = (id) =>
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)),
    );

  return (
    <CustomerContext.Provider
      value={{
        customers, setCustomers,
        transactions,
        trashedTransactions,
        trashedCustomers,
        addCustomer, addTransaction,
        deleteTransaction,
        deleteCustomer,  
        restoreTransaction, 
        restoreCustomer,
        permanentDelete,
        permanentDeleteCustomer,
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
