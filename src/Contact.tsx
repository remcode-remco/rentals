import { useState, forwardRef } from "react"
import Heading2 from "./shared/Heading2.tsx"
import Paragraph from "./shared/Paragraph.tsx";
import IconMarker from "./shared/icons/IconMarker.tsx";
import IconEmail from "./shared/icons/IconEmail.tsx";
import IconPhone from "./shared/icons/IconPhone.tsx";
import Heading3 from "./shared/Heading3.tsx";

interface FormInput {
  name:string;
  email:string;
  message:string;
}

export interface TextContact {
  title:string;
  text:string;
  owner_image:string;
  owner:string;
  email:string;
  phone:string;
  address:string;
  message:string;
}

interface ContactProps {
  content?: TextContact;
}

const ContactInput = ({text,name,handleChange}:{text:string,name:string,handleChange:(e:any)=>void}) => (
  <div className="flex flex-col mb-3">
    <label className="capitalize font-medium">{name}</label>
    {name === "message" ?
      <textarea onChange={(e=>handleChange(e))} rows={10} name={name} defaultValue={text} className="shadow h-auto min-h-[186px] w-full overflow-auto bg-white px-3 pb-2 text-sm text-[#333333]" />
    :
      <input onChange={(e) => handleChange(e)} name={name} defaultValue={text} className="shadow h-9 w-full bg-white px-3 pb-6 text-sm text-[#333333]" />
    }
  </div>
)

const ContactDetails = ({content}:{content?:TextContact}) => {
  let pClasses:string = "px-4 text-lg whitespace-pre-line"
  if (content) {
    return (
      <div className="flex flex-col mx-auto gap-4">
        <div className="mb-4 flex max-w-[272px] items-start justify-start">
          <IconMarker size={"30"} color={""} />
          <p className={pClasses}>{content?.address}</p>
        </div>
        <div className="mb-4 flex max-w-[272px] items-start justify-start">
          <IconEmail size={"30"} color={""} />
          <p className={pClasses}>{content?.email}</p>
        </div>
        <div className="mb-4 flex max-w-[272px] items-start justify-start">
          <IconPhone size={"30"} color={""} />
          <p className={pClasses}>{content?.phone}</p>
        </div>
      </div>
    )
  }
}

const Contact: React.ForwardRefRenderFunction<HTMLDivElement, ContactProps> = ({ content }, ref) => {
  // const contextValue = useContext(RentalsContext)
  // const { password, editingSection, language } = contextValue as AppContext
  const [formInput,setFormInput] = useState<FormInput>({name:"",email:"",message:""})
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
      setFormInput({
      ...formInput,
      [name]: value,
    })
  }
  
    return (
      <section ref={ref}>
        <div className="relative bg-white mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="grid items-center gap-8 sm:gap-20 lg:grid-cols-2">
            <div className="flex max-w-2xl flex-col items-start gap-4">
              <Heading2 text={content?.title} />
              <Paragraph text={content?.text} />
              <div className="flex items-center mx-auto">
                {content?.owner_image && <img src={content.owner_image} alt="" className="rounded-full mr-4 inline-block h-16 w-16 object-cover" />}
                <div className="flex h-full items-center">
                  <h6 className="font-bold">{content?.owner}</h6>
                </div>
              </div>
              <ContactDetails content={content} />
            </div>
            
            <div className="mx-2 max-w-xl bg-gray-100 px-8 py-5 text-center shadow-lg">
              
              <Heading3 text={content?.message} />
              <form className="mx-auto my-4 max-w-sm text-left" name="wf-form-password" method="get">
                <ContactInput
                  text={""}
                  name={"name"}
                  handleChange={handleChange}
                />              
                <ContactInput
                  text={""}
                  name={"email"}
                  handleChange={handleChange}
                />              
                <ContactInput
                  text={""}
                  name={"message"}
                  handleChange={handleChange}
                />
                <div className="flex justify-end">
                  <input type="submit" value="Submit" className="cursor-pointer mb-10 px-4 py-2 rounded shadow bg-blue-500 text-white" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default forwardRef(Contact)