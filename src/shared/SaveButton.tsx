
const SaveButton = ({text,handleUpload,setEditingSection}:{text:string,handleUpload:()=>void,setEditingSection:(editingSection:number)=>void}) => {
  let classes:string = "z-50 cursor-pointer mb-10 px-4 py-2 z-10 rounded shadow"

  return (
    <div className="fixed bottom-0 flex justify-center w-full">
      <div className="flex gap-4">
        <div onClick={()=>setEditingSection(0)} className={`bg-gray-300 ${classes}`}>Cancel</div>
        <div onClick={()=>handleUpload()} className={`bg-blue-500 text-white ${classes}`}>Save {text}</div>
      </div>
    </div>
  )
}

export default SaveButton