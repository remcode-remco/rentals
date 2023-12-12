
const SaveButton = ({handleUpload,setEditingSection}:{handleUpload:()=>void,setEditingSection:(editingSection:number)=>void}) => {
  let classes:string = "z-40 cursor-pointer mb-10 px-4 py-2 z-10 rounded shadow"

  return (
    <div className="flex justify-center w-full">
      <div className="flex gap-4">
        <div onClick={()=>setEditingSection(0)} className={`bg-gray-300 ${classes}`}>Cancel</div>
        <div onClick={()=>handleUpload()} className={`bg-blue-500 text-white ${classes}`}>Save</div>
      </div>
    </div>
  )
}

export default SaveButton