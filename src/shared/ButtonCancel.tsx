const ButtonCancel = ({setEditingSection}:{setEditingSection:(editingSection:number)=>void}) => (
  <div onClick={()=>setEditingSection(-1)} 
        className="text-xl text-green-800 border border-green-100 z-40 cursor-pointer 
                   px-4 py-2 z-10 rounded shadow shadow-green-800 hover:shadow-green-800 hover:shadow-lg"
  >
    Cancel
  </div>
)

export default ButtonCancel