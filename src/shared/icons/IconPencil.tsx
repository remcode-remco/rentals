const IconPencil = ({size,color,onClick}:{size:string,color:string,onClick:()=>void}) => {

  return (
    <svg onClick={()=>onClick()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
      strokeWidth="1.5" stroke="currentColor" width={size} height={size} className={`mx-3 border border-green-800 text-green-800 bg-white hover:shadow hover:shadow-green-800 cursor-pointer rounded-xl p-2 ${color}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
  )
}

export default IconPencil