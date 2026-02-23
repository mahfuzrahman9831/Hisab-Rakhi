import React from "react";
import Group_Business from "../assets/Components/Dashboard/Group_Business";
import Summary_Cards from "../assets/Components/Dashboard/Summary_Cards";
import Search from "../assets/Components/Dashboard/Search";
import Tranactions from "../assets/Components/Dashboard/Tranactions";
import PageHeader from "../assets/Components/Common/Header";

export default function Home() {
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
