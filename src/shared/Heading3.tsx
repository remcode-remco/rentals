const Heading3 = ({text}:{text?:string}) => (
  <h3 className="w-full text-2xl md:text-2xl lg:text-3xl text-gray-700 font-bold text-center px-1 py-2">
    {text ? text : ""}
  </h3>
)

export default Heading3