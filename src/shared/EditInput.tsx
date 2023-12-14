const EditInput = ({text,name,handleChange}:{text:string,name:string,handleChange:(e:any)=>void}) => (
  <>
    <label className="block">{name}</label>
    {name === "description" ?
      <textarea onChange={(e=>handleChange(e))} rows={10} name={name} defaultValue={text} className="border shadow w-full lg:mt-4 text-gray-600" />
    :
      <input onChange={(e) => handleChange(e)} name={name} defaultValue={text} className="my-2 p-1 border shadow w-full" />
    }
  </>
)

export default EditInput