import { useState, forwardRef } from "react"
import Heading2 from "./shared/Heading2.tsx"
import Paragraph from "./shared/Paragraph.tsx"
import Heading3 from "./shared/Heading3.tsx"
import { FaInstagram, FaMapMarkerAlt } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"
import { FiPhone, FiTwitter, FiFacebook } from "react-icons/fi"

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
  facebook:string;
  instagram:string;
  twitter:string;
  address:string;
  message:string;
  googlemaps:string;
  locate_us:string;
}

interface ContactProps {
  content?: TextContact;
}

const ContactInput = ({text,name,handleChange}:{text:string,name:string,handleChange:(e:any)=>void}) => (
  <div className="flex flex-col mb-3 w-full">
    <label className="capitalize pb-2 text-xl md:text-3xl lg:text-2xl text-gray-600 whitespace-pre-line">{name}</label>
    {name === "message" ?
      <textarea onChange={(e=>handleChange(e))} rows={10} name={name} defaultValue={text} className="shadow overflow-auto bg-white p-3" />
    :
      <input onChange={(e) => handleChange(e)} name={name} defaultValue={text} className="shadow bg-white p-3" />
    }
  </div>
)

const ContactDetailsLink = ({data,type}:{data?:string,type:number}) => (
  // 1 = mail
  // 2 = phone
  // 3 = facebook
  // 4 = instagram
  // 5 = twitter
  type === 1 ?
    <a href={`mailto:${data}`}><MdOutlineEmail size={"30"} color={""} /></a>
  :
  type === 2 ?
    <a href={`tel:${data}`}><FiPhone size={"30"} color={""} /></a>
  :
  type === 3 ?
    <a href={data} target="_blank" rel="noopener noreferrer"><FiFacebook size={"30"} color={""} /></a>
  :
  type === 4 ?
    <a href={data} target="_blank" rel="noopener noreferrer"><FaInstagram size={"30"} color={""} /></a>
  :
  type === 5 ?
    <a href={data} target="_blank" rel="noopener noreferrer"><FiTwitter size={"30"} color={""} /></a>
  :
    null
)

const ContactDetails = ({content}:{content?:TextContact}) => (
  <div className="lg:col-span-2 flex w-full items-center justify-center">
    <div className="flex flex-col items-center w-full md:mx-auto md:w-auto bg-gray-100 p-5 rounded-xl shadow-lg">
      {content?.owner_image && <img src={content.owner_image} alt="" className="rounded-xl shadow-lg w-40 object-cover" />}
      <div className="flex flex-col h-full items-center">
        <Heading3 text={content?.owner} />
        <div className="flex gap-6 text-gray-800">
          <ContactDetailsLink data={content?.email} type={1} />
          <ContactDetailsLink data={content?.phone} type={2} />
          <ContactDetailsLink data={content?.facebook} type={3} />
          <ContactDetailsLink data={content?.instagram} type={4} />
          <ContactDetailsLink data={content?.twitter} type={5} />
        </div>
      </div>
    </div>
  </div>
)


const ContactForm = ({message}:{message?:string}) => {
  const [formInput,setFormInput] = useState<FormInput>({name:"",email:"",message:""})
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
      setFormInput({
      ...formInput,
      [name]: value,
    })
  }

  return (
    <div className="lg:rounded-xl lg:shadow-lg bg-gray-50 relative p-3 lg:p-10 lg:ml-3 lg:mr-2 flex flex-col w-full lg:h-full items-center justify-center">
      <Heading3 text={message} />
      <form className="max-w-xl mx-auto flex flex-col items-center w-full">
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
        <div className="flex justify-center ">
          <input type="submit" value="Submit" className="cursor-pointer mb-3 px-4 py-2 rounded shadow-lg text-xl bg-blue-500 text-white" />
        </div>
      </form>
    </div>
  )
}

const ContactMap = ({content}:{content?:TextContact}) => (
  <div className="lg:rounded-xl lg:shadow-lg lg:p-5 lg:bg-gray-50 mb-4 lg:mb-0 lg:mr-3 lg:ml-2 flex flex-col">
    <Heading3 text={content?.locate_us} />
    <Paragraph text={content?.address} />
    <div className="w-full">
      <iframe 
        src={content?.googlemaps}
        className="" 
        width="100%" 
        height="500" 
        allowFullScreen 
        loading="lazy"
      >
      </iframe>
    </div>
  </div>
)

const Contact: React.ForwardRefRenderFunction<HTMLDivElement, ContactProps> = ({ content }, ref) => {
  // const contextValue = useContext(RentalsContext)
  // const { password, editingSection, language } = contextValue as AppContext

  
    return (
      <section ref={ref}>
        <div className="bg-white w-full relative pb-20">
          <div className="relative bg-white mx-auto w-full max-w-6xl pt-16 lg:pt-24">
            <Heading2 text={content?.title} />
            <div className="max-w-2xl mx-auto">
              <Paragraph text={content?.text} />
            </div>
            <div className="grid items-center lg:items-start gap-8 lg:grid-cols-2">
              <ContactDetails content={content} />
              <ContactForm message={content?.message} />
              <ContactMap content={content} />
            </div>
          </div>
        </div>
      </section>
  )
}

export default forwardRef(Contact)