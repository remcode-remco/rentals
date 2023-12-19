const Heading1 = ({text,subtext,scrolledHalfway}:{text:string,subtext:string,scrolledHalfway:boolean}) => (
  <div className={`m-2 bg-white/90 rounded p-3 shadow-lg tranform duration-1000 ${scrolledHalfway ? "opacity-0" : "opacity-100"}`}>
    <h1 className="text-3xl font-bold leading-tight">
      {text}
    </h1>
    <p className="mt-1 lg:mt-4 text-gray-800">
      {subtext}
    </p>
  </div>
)

export default Heading1