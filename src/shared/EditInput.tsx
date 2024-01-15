const EditInput = ({text,name,handleChange}:{text:string,name:string,handleChange:(e:any)=>void}) => { 
  let classes:string = "w-full p-1 rounded text-xl border border-green-800 shadow shadow-green-800 w-full text-gray-800 focus:shadow-lg mb-1"
  return (
    <div>
      <label className="block text-xl capitalize p-1">{name}</label>
      {name === "description" || name === "text" ?
        <textarea onChange={(e=>handleChange(e))} rows={6} name={name} defaultValue={text} className={classes} />
      :
        <input onChange={(e) => handleChange(e)} name={name} defaultValue={text} className={classes} />
      }
    </div>
  )
}

export default EditInput