const Heading3 = ({text}:{text?:string}) => (
  <h3 className="w-full text-2xl text-gray-700 font-extrabold uppercase text-center pt-2 pb-4">
    {text ? text : ""}
  </h3>
)

export default Heading3