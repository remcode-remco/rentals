const Heading3 = ({text}:{text?:string}) => (
  <h3 className="w-full text-3xl md:text-4xl lg:text-3xl text-gray-700 font-bold text-center py-2">
    {text ? text : ""}
  </h3>
)

export default Heading3