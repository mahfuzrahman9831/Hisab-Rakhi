// Get all transactions of a customer
export function getCustomerTransactions(transactions, customerId) {
  return transactions.filter((t) => t.customerId === customerId);
}

// Calculate total balance
export function getCustomerBalance(transactions, customerId) {
  const list = getCustomerTransactions(transactions, customerId);

  return list.reduce((acc, t) => {
    return acc + (t.sell || 0) - (t.buy || 0);
  }, 0);
}

// Calculate running balance (ledger style)
export function getRunningBalances(transactions) {

  const ordered = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let running = 0;

  return ordered.map((txn) => {

    running += (txn.sell || 0) - (txn.buy || 0);

    return {
      ...txn,
      balance: running
    };

  });
}

// Get totals for report
export function getTotals(transactions) {

  let totalSell = 0;
  let totalBuy = 0;

  transactions.forEach((t) => {
    totalSell += t.sell || 0;
    totalBuy += t.buy || 0;
  });

  return {
    totalSell,
    totalBuy
  };

}