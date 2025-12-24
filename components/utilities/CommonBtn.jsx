import React from "react";

function CommonBtn({ text, className, icon }) {
  return (
    <button className="border text-white border-[#fdd300] rounded-full py-1.5 px-6 flex items-center gap-x-1 hover:bg-[#fdd300] hover:text-black transition">
      <span className=' text-base font-semibold'>
        <span className='flex items-center gap-x-3'>
          {text}
          {icon && <span> {icon}</span>}
        </span>
      </span>

    </button>
  );
}

export default CommonBtn;
