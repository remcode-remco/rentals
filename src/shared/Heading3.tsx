const Heading3 = ({text}:{text?:string}) => (
  <h3 className="w-full text-2xl md:text-4xl text-gray-700 font-bold text-center p-2">
    {text ? text : ""}
  </h3>
)

export default Heading3