import { useContext, useEffect, useState } from "react"
import { SaveEdit } from "./constants/constants.tsx"
import Heading2 from "./shared/Heading2.tsx"
import { AppContext, RentalsContext } from "./App.tsx";
import Edit from "./shared/Edit.tsx";
import Paragraph from "./shared/Paragraph.tsx";

export interface TextContact {
  title:string;
  text:string;
  email:string;
  phone:string;
  address:string;
}

const Contact = ({content}:{content:TextContact}) => {
  const contextValue = useContext(RentalsContext)
  const { password, editingSection, language } = contextValue as AppContext
  
  const [changes, setChanges] = useState<TextContact>()
  
  const handleChange = (e: any) => {
    if (changes) {
      setChanges({
        ...changes,
        [e.target.name]:e.target.value
      })
    }
  }
  
  const handleUpload = () => {
    SaveEdit(language,password,editingSection,changes)
  }

  useEffect(()=>{
    if (content) {setChanges(content)}
  },[content])

  if (content) {
    return (
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="relative lg:col-span-2 lg:py-12">
              <Heading2 text={content.title} />
              <Paragraph text={content.text} />
              {password && <Edit section={5} />}
            </div>
    
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                />
              </div>
    
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Email address"
                    type="email"
                    id="email"
                    onChange={(e)=>handleChange(e)}
                  />
                </div>
              </div>
    
              <div>
                <label className="sr-only" htmlFor="message">Message</label>
    
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Message"
                  rows={8}
                  id="message"
                ></textarea>
              </div>
    
              <div className="mt-4">
                <button onSubmit={()=>handleUpload()}
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    )
  } else {
    return <div>Loading...</div>
  }
}

export default Contact