import { useEffect, useState } from "react"
import IconArrow from "./shared/IconArrow.tsx"
import { SaveEdit } from "./constants/constants.tsx";

export interface TextHero {
  title: string;
  subtitle: string;
  button_text:string;
}

const Hero = ({content,password,editingSection, setEditingSection}:{content:TextHero,password:string,editingSection:number,setEditingSection:(editingSection:number)=>void}) => {
  const [changes, setChanges] = useState<TextHero>()
  
  const handleChange = (e: any) => {
    if (changes) {
      setChanges({
        ...changes,
        [e.target.name]:e.target.value
      })
    }
  }
  
  const handleUpload = () => {
    SaveEdit(password,editingSection,setEditingSection,changes)
  }

  useEffect(()=>{
    if (content) {setChanges(content)}
  },[content])

  if (content) {
    return (
      <section
        className="relative w-full bg-[url('images/hero.webp')] bg-cover bg-center bg-no-repeat h-[50vh]"
      >
        <div
          className="absolute inset-0"
        ></div>

        <div
          className="absolute bottom-0 left-0 right-0 mx-auto max-w-screen-xl px-4 py-2 lg:py-8 lg:flex lg:h-screen items-end lg:px-8"
        >
          <div className={`flex flex-col items-start bg-white rounded-xl p-3`}>
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              {content.title}
            </h1>

            <p className="mt-1 lg:mt-4 max-w-lg sm:text-xl/relaxed">
              {content.subtitle}
            </p>

            <div className="mt-2 lg:mt-8 h-auto text-center">
              <a
                href="#"
                className={`block w-full rounded px-8 py-3 text-sm font-medium text-black shadow w-auto flex items-center`}
              >
                {content.button_text}
                <IconArrow color="text-green-900" size="20" />
              </a>
            </div>
          </div>
        </div>
      </section>

    )
  } else {
    return <div>Loading...</div>
  }
}

export default Hero