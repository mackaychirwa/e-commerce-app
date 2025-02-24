"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="border border-[#3fa6c5] text-[#3fa6c5] px-4 py-2 rounded-md hover:bg-[#3fa6c5] hover:text-white transition"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
