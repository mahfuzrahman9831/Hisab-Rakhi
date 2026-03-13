import { getCustomerBalance } from "./ledger";
 
export function generateCustomerReport(customers, transactions, shopInfo) {
 
  // ✅ Safety check — undefined হলে crash করবে না
  const safeCustomers = Array.isArray(customers) ? customers : [];
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
 
  const customerData = safeCustomers.map((customer) => {
    const balance = getCustomerBalance(safeTransactions, customer.id);
    return {
      name: customer.name,
      phone: customer.phone || "",
      pabo: balance > 0 ? balance : 0,
      debo: balance < 0 ? Math.abs(balance) : 0,
    };
  });
 
  const totalPabo = customerData.reduce((sum, c) => sum + c.pabo, 0);
  const totalDebo = customerData.reduce((sum, c) => sum + c.debo, 0);
 
  const now = new Date();
  const banglaMonths = [
    "জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন",
    "জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",
  ];
  const toBanglaNumber = (n) =>
    String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
 
  const day = toBanglaNumber(now.getDate());
  const month = banglaMonths[now.getMonth()];
  const year = toBanglaNumber(now.getFullYear());
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const timeStr = `${toBanglaNumber(hours)}:${toBanglaNumber(minutes)} ${ampm}`;
  const dateStr = `${day} ${month}, ${year} - ${timeStr}`;
 
  const formatMoney = (amount) =>
    Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
 
  const rows = customerData.map((c, i) => `
    <tr class="${i % 2 === 0 ? "row-even" : "row-odd"}">
      <td class="name-cell">
        <span class="cust-name">${c.name}</span>
        ${c.phone ? `<span class="cust-phone">${c.phone}</span>` : ""}
      </td>
      <td class="amount-cell pabo-cell">
        ${c.pabo > 0
          ? `<span class="pabo-amount">${formatMoney(c.pabo)}</span>`
          : '<span class="zero">০.০০</span>'}
      </td>
      <td class="amount-cell debo-cell">
        ${c.debo > 0
          ? `<span class="debo-amount">${formatMoney(c.debo)}</span>`
          : '<span class="zero">০.০০</span>'}
      </td>
    </tr>`).join("");
 
  const html = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <title>${shopInfo?.shopName || "হিসাব-রাখি"} - রিপোর্ট</title>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Hind Siliguri', sans-serif; background: #fff; color: #1a1a2e; }
    .header { background: #fff; border-bottom: 3px solid #13ec6d; padding: 20px 32px 16px; display: flex; justify-content: space-between; align-items: flex-start; }
    .shop-name { font-size: 22px; font-weight: 700; color: #c0392b; }
    .shop-phone { font-size: 13px; color: #555; margin-top: 4px; }
    .header-logo { font-size: 18px; font-weight: 700; color: #13ec6d; background: #f0fdf4; padding: 8px 14px; border-radius: 8px; border: 2px solid #13ec6d; }
    .meta { padding: 14px 32px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #555; display: flex; gap: 28px; }
    .meta span strong { color: #1a1a2e; }
    .table-wrap { padding: 0 16px 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    thead tr { background: #f3f4f6; }
    thead th { padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e5e7eb; }
    thead th.right { text-align: right; }
    tbody tr { border-bottom: 1px solid #f0f0f0; }
    .row-odd { background: #fff; }
    .row-even { background: #fafafa; }
    .name-cell { padding: 11px 14px; vertical-align: middle; }
    .cust-name { display: block; font-weight: 600; color: #111827; font-size: 13.5px; }
    .cust-phone { display: block; font-size: 11px; color: #9ca3af; margin-top: 1px; }
    .amount-cell { padding: 11px 14px; text-align: right; vertical-align: middle; min-width: 110px; }
    .pabo-amount { font-weight: 700; color: #e53e3e; font-size: 14px; }
    .debo-amount { font-weight: 700; color: #16a34a; font-size: 14px; }
    .zero { color: #d1d5db; font-size: 13px; }
    .pabo-cell { background: rgba(254,226,226,0.15); }
    .debo-cell { background: rgba(220,252,231,0.15); }
    .tfoot-row td { padding: 14px; font-weight: 700; font-size: 15px; border-top: 2px solid #e5e7eb; background: #f9fafb; }
    .total-label { text-align: right; color: #374151; font-size: 14px; }
    .total-pabo { color: #e53e3e; text-align: right; }
    .total-debo { color: #16a34a; text-align: right; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      @page { margin: 10mm; size: A4 portrait; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="shop-name">${shopInfo?.shopName || "আমার দোকান"}</div>
      ${shopInfo?.shopPhone ? `<div class="shop-phone">Ph: ${shopInfo.shopPhone}</div>` : ""}
    </div>
    <div class="header-logo">হিসাব-রাখি</div>
  </div>
  <div class="meta">
    <span>রিপোর্ট তৈরি: <strong>${dateStr}</strong></span>
    <span>মোট কাস্টমার: <strong>${toBanglaNumber(safeCustomers.length)}</strong></span>
  </div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>কাস্টমার/সাপ্লায়ারের তালিকা</th>
          <th class="right">পাবো</th>
          <th class="right">দেবো</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr class="tfoot-row">
          <td class="total-label">সর্বমোট</td>
          <td class="total-pabo">${formatMoney(totalPabo)}</td>
          <td class="total-debo">${formatMoney(totalDebo)}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</body>
</html>`;
 
  const win = window.open("", "_blank", "width=800,height=900");
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 800);
}