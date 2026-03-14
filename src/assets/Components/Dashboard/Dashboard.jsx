import React from "react";
import Header from "./Header";
import Group_Business from "./Group_Business";
import Tranactions from "./Tranactions";
import SummaryCardNew from "./SummaryCardNew";

export default function Dashboard() {
  return (
    <div>
      <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
        <Header></Header>
        <Group_Business></Group_Business>
        <SummaryCardNew></SummaryCardNew>
        <Tranactions></Tranactions>
      </div>
    </div>
  );
}
