import { Language, Menu } from "./Navigation"
import IconEmail from "./shared/icons/IconEmail"
import IconMarker from "./shared/icons/IconMarker"
import IconPhone from "./shared/icons/IconPhone"
import { TextNavigation } from "./Navigation"
import { TextContact } from "./Contact"

interface ContentFooter {
	contact?:TextContact;
	navigation?:TextNavigation;
	languages?: string[];
}

const Footer = ({content,setLanguage}:{content?:ContentFooter,setLanguage:(language:string)=>void}) => {
	
  const { contact, navigation, languages } = content || {}
	
	return (
		<footer className="block">
			<div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
				<div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
					<div className="w-full px-5">
						<iframe 
							src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2866.2919816423278!2d-68.84758992454664!3d44.07732682489766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDTCsDA0JzM4LjQiTiA2OMKwNTAnNDIuMSJX!5e0!3m2!1sen!2sfr!4v1701965769870!5m2!1sen!2sfr" 
							className="" 
							width="100%" 
							height="300" 
							allowFullScreen 
							loading="lazy"
						>
						</iframe>
					</div>
					<div className="max-[767px]: max-[991px]:ml-4 max-[991px]:flex-none max-[767px]:mt-8">
						<div className="mb-4 flex max-w-[272px] items-start justify-start">
							<IconMarker size={"8"} color={"text-black"} />
							<p className="text-[#636262] max-[479px]:text-sm">{contact?.address}</p>
						</div>
						<div className="mb-4 flex max-w-[272px] items-start justify-start">
							<IconEmail size={"8"} color={"text-black"} />
							<p className="text-[#636262] max-[479px]:text-sm">{contact?.email}</p>
						</div>
						<div className="mb-4 flex max-w-[272px] items-start justify-start">
							<IconPhone size={"8"} color={"text-black"} />
							<p className="text-[#636262] max-[479px]:text-sm">{contact?.phone}</p>
						</div>
					</div>
				</div>
				<div className="mb-14 mt-16 w-full [border-bottom:1.7px_solid_rgb(0,_0,_0)]"></div>
				<div className="flex flex-row justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
					<Menu content={navigation} setLanguage={setLanguage} />
					<Language languages={languages} setLanguage={setLanguage} />
				</div>
			</div>
		</footer>
	)
}

export default Footer