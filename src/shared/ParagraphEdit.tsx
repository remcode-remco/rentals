const ParagraphEdit = ({text,name,handleChange}:{text:string,name:string,handleChange:(e: any)=>void}) => (
  <textarea onChange={(e=>handleChange(e))} rows={10} name={name} defaultValue={text} className="border shadow w-full lg:mt-4 text-gray-600" />
)

export default ParagraphEdit