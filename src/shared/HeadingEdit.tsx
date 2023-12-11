const HeadingEdit = ({text,name,handleChange}:{text:string,name:string,handleChange:(e: any)=>void}) => (
  <input onChange={(e=>handleChange(e))} name={name} defaultValue={text} className="border shadow text-3xl font-bold sm:text-4xl" />
)

export default HeadingEdit