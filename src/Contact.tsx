import { useState, forwardRef, useContext } from "react"
import Heading2 from "./shared/Heading2.tsx"
import Paragraph from "./shared/Paragraph.tsx"
import Heading3 from "./shared/Heading3.tsx"
import { FaInstagram } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md"
import { FiPhone, FiTwitter, FiFacebook } from "react-icons/fi"
import { RentalsContext, AppContext } from "./Home.tsx"
import Edit from "./shared/Edit.tsx"
import EditPicture from "./shared/EditPicture.tsx"

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
      <textarea onChange={(e=>handleChange(e))} rows={10} name={name} defaultValue={text} className="shadow shadow-green-600 overflow-auto bg-white p-3" />
    :
      <input onChange={(e) => handleChange(e)} name={name} defaultValue={text} className="shadow shadow-green-600 bg-white p-3" />
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

const ContactDetails = ({content}:{content?:TextContact}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center md:mx-auto md:w-auto bg-gray-50 p-5 rounded-xl shadow-lg hover:shadow-green-600 duration-300 transition-all">
        <div className="relative">
          <img  src={content?.owner_image ? content.owner_image : "/images/img_placeholder.png"} 
                alt="owner profile picture" 
                className="rounded-xl shadow-lg w-40 object-cover" 
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/img_placeholder.png";
                }}
          />
          {password && <EditPicture section={4} />}
        </div>
        <div className="flex flex-col h-full items-center">
          <Heading3 text={content?.owner} />
          <div className="flex gap-6 text-gray-800 my-3">
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
}

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
    <div className="relative p-3 lg:p-10 lg:ml-3 lg:mr-2 flex flex-col w-full lg:h-full items-center justify-center">
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
          <input type="submit" value="Submit" className="cursor-pointer mb-3 px-10 py-2 rounded-full shadow-lg hover:shadow-green-600 text-xl bg-white text-gray-800 border border-green-600" />
        </div>
      </form>
    </div>
  )
}

const ContactMap = ({content}:{content?:TextContact}) => (
  <div className="lg:rounded-xl lg:shadow-lg lg:p-5 lg:bg-white mb-4 lg:mb-0 lg:mr-3 lg:ml-2 flex flex-col">
    <Heading3 text={content?.locate_us} />
    <div className="px-10 pt-3">
      <Paragraph text={content?.address} />
    </div>
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
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext
  
    return (
      <section ref={ref}>
        <div className="bg-white w-full relative">
          <div className="relative bg-white md:bg-gray-50 mx-auto w-full pt-16 lg:pt-24 pb-10">
            <div className="relative bg-white">
              <Heading2 text={content?.title} />
              {password && <Edit section={5} />}
            </div>
            <div className="bg-white mx-auto">
              <div className="max-w-6xl md:mx-auto grid md:grid-cols-2 pb-5">
                <div className="relative">
                  <Paragraph text={content?.text} />
                  {password && <Edit section={5} />}
                </div>
                <ContactDetails content={content} />
              </div>
            </div>
            <div className="md:bg-gray-50 md:max-w-6xl md:mx-auto">
              <div className="md:p-5 grid items-center lg:items-start gap-8 lg:grid-cols-2">
                <ContactForm message={content?.message} />
                <ContactMap content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default forwardRef(Contact)