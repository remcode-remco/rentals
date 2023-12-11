// import Video2 from "./Video2"
import Video2 from "./Video2.tsx"
import Heading from "./shared/Heading.tsx"
// import area_nl from "./content/area_nl.json"
// import area_en from "./content/area_en.json"
import HeadingEdit from "./shared/HeadingEdit.tsx";
import ParagraphEdit from "./shared/ParagraphEdit.tsx";
import Paragraph from "./shared/Paragraph.tsx";
import { useEffect, useState } from "react";
import SaveButton from "./shared/SaveButton.tsx";
import { SaveEdit } from "./constants/constants.tsx";

export interface TextArea {
  title:string;
  text:string;
  button_text:string;
  video:string;
}

const Area = ({content,password,editingSection, setEditingSection}:{content:TextArea,password:string,editingSection:number,setEditingSection:(editingSection:number)=>void}) => {
  const [changes, setChanges] = useState<TextArea>()
  
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
      <section>
        <div onClick={()=>setEditingSection(3)}
          className="relative mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
            <div className="lg:hidden">
              <Heading text={content.title} password={password} />
            </div>
            <div
              className="relative overflow-hidden rounded-lg lg:order-last h-full"
            >
              <Video2 video={content.video} />
            </div>

            <div className="lg:py-24">
              <div className="hidden md:block">
                {editingSection === 3 ?
                  <HeadingEdit text={content.title} name="title" handleChange={handleChange} />
                :
                  <Heading password={password} text={content.title} />
                }
              </div>

              {editingSection === 3 ?
                <ParagraphEdit text={content.text} name="text" handleChange={handleChange} />
              :
                <Paragraph text={content.text} />
                
              }

              <a
                href="#"
                className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                {content.button_text}
              </a>
            </div>
              {editingSection === 3 && <SaveButton text={content.title} handleUpload={handleUpload} setEditingSection={setEditingSection} />}
              </div>
        </div>
      </section>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default Area