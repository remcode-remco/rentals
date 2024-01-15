
const ButtonSave = ({handleUpload}:{handleUpload:()=>void}) => (
  <div onClick={()=>handleUpload()} 
       className="text-xl bg-green-800 text-white border border-green-100 z-40 cursor-pointer 
                  px-4 py-2 z-10 rounded shadow shadow-green-800 hover:shadow-green-800 hover:shadow-lg"
  >
    Save
  </div>
)
export default ButtonSave