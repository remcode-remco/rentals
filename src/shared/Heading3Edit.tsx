const Heading3Edit = ({text,name,handleChange}:{text:string,name:string,handleChange:(e: any)=>void}) => (
  <input onChange={(e=>handleChange(e))} name={name} defaultValue={text} className="border shadow text-2xl font-bold" />
)

export default Heading3Edit