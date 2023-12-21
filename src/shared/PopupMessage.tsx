import { useEffect, useState } from 'react'
import { Message } from '../Home'

const PopupMessage = ({message,setMessage}:{message:Message|null,setMessage:(message:Message|null)=>void}) => {
  const [classNames,setClassnames]=useState<string>("transition-all translate-y-full")

  useEffect(() => {
    if (message) {
      setClassnames("transition-all translate-y-0")
      const timer = setTimeout(() => {
        setClassnames("transition-all translate-y-full")
      }, 1500);
      const timer2 = setTimeout(() => {
        setMessage(null)
      }, 2500);
      return () => {clearTimeout(timer);clearTimeout(timer2)};

    }
  }, [message])
  
  return (
      <div className={`fixed bottom-0 left-0 right-0  z-40 overflow-y-auto 
        ${classNames}
        `}
      >
        <div className='mx-auto max-w-sm flex justify-center my-10'>
          <span onClick={()=>setMessage(null)} className='bg-green-500 text-white py-2 px-3 text-xl rounded shadow-lg shadow-gray-600 flex p-2'>
            <svg className="h-10 w-10 text-gray-200 border rounded-full border-gray-200 border-2 p-1"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className='p-2'>{message ? message.message : ""}</span>
          </span>
        </div>
      </div>
  )
}

export default PopupMessage
