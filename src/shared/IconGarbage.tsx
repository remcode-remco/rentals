const IconGarbage = ({size,color}:{size:string,color:string}) => {
  return (
    <svg className={`${color} ${size ? size : "h-6 w-6"} text-black p-1 rounded cursor-pointer`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  
      <polyline points="3 6 5 6 21 6" />  
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  
      <line x1="10" y1="11" x2="10" y2="17" />  
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}

export default IconGarbage