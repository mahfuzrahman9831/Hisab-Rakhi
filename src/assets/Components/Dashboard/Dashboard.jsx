import React from "react";
import Header from "./Header";
import Group_Business from "./Group_Business";
import Summary_Cards from "./Summary_Cards";
import Search from "./Search";
import Tranactions from "./Tranactions";
import Footer_Nav from "./Footer_Nav";

export default function Dashboard() {
  return (
    <div>
      <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
        <Header></Header>
        <Group_Business></Group_Business>
        <Summary_Cards></Summary_Cards>
        <Search></Search>
        <Tranactions></Tranactions>
        {/* <button className="absolute right-6 bottom-14 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center z-40 transition active:scale-95">
          <span className="text-3xl font-bold leading-none">+</span>
        </button> */}
        {/* <Footer_Nav></Footer_Nav> */}
      </div>
    </div>
  );
}
