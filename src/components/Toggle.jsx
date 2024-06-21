import React, { useState } from "react";
import Demo from "./Demo";
import TextSummary from "./TextSummary";


const Toggle = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("tab") == undefined ? "url": localStorage.getItem("tab")); // 'url' or 'text'

  return (
    <>
    <div className='mt-9  flex justify-center items-center  toggle'>
      <div className='flex '>
        <button onClick={() => {
            setActiveTab("url");
            localStorage.setItem("tab","url")
        }} className={`tab_btn ${activeTab === "url" && "active"}`}>Url</button>
        <button onClick={() => {
            setActiveTab("text")
            localStorage.setItem("tab","text")
        }} className={`tab_btn  ${activeTab === "text" && "active"}`}>Text</button>
      </div>
    </div>

      {activeTab === "url" ? <Demo /> : <TextSummary />}
      </>
  );
};

export default Toggle;