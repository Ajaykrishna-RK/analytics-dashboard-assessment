import React from "react";

function Header({ open, setOpen }) {
  return (
    <nav className="bg-[#fff] shadow-lg text-[#111] p-4">
      <span className=" text-xl font-semibold">Ev Dataset</span>
    </nav>
  );
}

export default Header;
