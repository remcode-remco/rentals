const Heading1 = ({text,subtext}:{text:string,subtext:string}) => (
  <>
    <h1 className="text-3xl font-extrabold">
      {text}
    </h1>
    <p className="mt-1 lg:mt-4">
      {subtext}
    </p>
  </>
)

export default Heading1