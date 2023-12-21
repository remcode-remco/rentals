const Heading1 = ({text,subtext,scrolledHalfway,doneLoading}:{text?:string,subtext?:string,scrolledHalfway:boolean,doneLoading:boolean}) => (
  <div className={`m-2 lg:bg-white/90 rounded text-white p-3 tranform duration-500 ${doneLoading && !scrolledHalfway ? "opacity-100 delay-500" : "opacity-0"}`}>
    <h1 className="text-7xl font-extrabold leading-tight">
      {text}
    </h1>
    <p className="mt-1 lg:mt-4 text-3xl">
      {subtext}
    </p>
  </div>
)

export default Heading1