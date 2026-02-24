import React from "react";
import Group_Business from "../assets/Components/Dashboard/Group_Business";
import Summary_Cards from "../assets/Components/Dashboard/Summary_Cards";
import Search from "../assets/Components/Dashboard/Search";
import Tranactions from "../assets/Components/Dashboard/Tranactions";
import PageHeader from "../assets/Components/Common/Header";
import { useCustomers } from "../Context/CustomerContext";


function timeAgo(date) {
  if (!date) return "Just now";

  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i].seconds);
    if (interval > 1) return interval + " " + intervals[i].label + "s ago";
    if (interval === 1) return interval + " " + intervals[i].label + " ago";
  }

  return "Just now";
}

export default function Home() {

  const { customers } = useCustomers();

  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
      <div className="pb-24">
        <PageHeader title="Dashboard" showBack={false}></PageHeader>
        <Group_Business></Group_Business>
        <Summary_Cards></Summary_Cards>
        <Search></Search>
        <Tranactions></Tranactions>
      </div>

      {/* <Footer_Nav></Footer_Nav> */}
    </div>
  );
}
