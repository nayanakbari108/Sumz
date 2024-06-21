import React, { useState } from "react";
import { loader } from "../assets"; // Assuming you have loader image in assets
import { useSummarizeTextMutation } from "../services/article";


const TextSummary = () => {
  const [text, setText] = useState(localStorage.getItem("text") == undefined ? "": localStorage.getItem("text"));
  const [summary, setSummary] = useState(localStorage.getItem("summary") == undefined ? "": localStorage.getItem("summary"));
  const [summarizeText, { isLoading, error }] = useSummarizeTextMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await summarizeText({ lang: "en", text });
    localStorage.setItem("text",text)
    
    if (data?.summary) {
        setSummary(data.summary);
        localStorage.setItem("summary",summary)
    }
  };


  return (
    <section className='mt-9 w-full max-w-xl'>
      {/* Text Input */}
      <div className='flex flex-col w-full gap-2'>
          <form className='relative flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <textarea
              placeholder='Enter the text to summarize'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className='textarea_input no-scrollbar '
            />
            <button type='submit' className='font-satoshi  submit_btn_text mt-4 flex items-center gap-1 '>
              <img className ="w-4 rotate-180 mb-1" src="src\assets\star.svg" alt="" />
              Summarize</button>
          </form>
        </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isLoading ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Text <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='text-justify font-inter font-medium text-sm text-gray-700'>
                  {summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default TextSummary;