import { useContext, useState } from "react"
import { AppContext, RentalsContext } from "./Home"
import ReactFlagsSelect from 'react-flags-select'
import Edit from "./shared/Edit"
import { Link } from "react-router-dom"
import IconEmail from "./shared/icons/IconEmail"
import IconPhone from "./shared/icons/IconPhone"
import IconBurger from "./shared/icons/IconBurger"
// import { lang } from "moment";

interface ContentNavigation {
  navigation?: TextNavigation;
  languages?: string[];
}

export interface TextNavigation {
  title: string;
  home: string;
  area: string;
  rentals: string;
  contact: string;
}

const MenuHamburger = ({content,languages,setLanguage,scrolledHalfway,setScrolledHalfway}:{content?:TextNavigation,languages?:string[],setLanguage:(language:string)=>void,scrolledHalfway:boolean,setScrolledHalfway:(scrolledHalfway:boolean)=>void}) => {
  const [showMenu,setShowMenu] = useState<boolean>(false)

  return (
    <div className="z-10 flex items-center lg:order-2">
      <button onClick={()=>{scrolledHalfway && !showMenu ? null : setScrolledHalfway(true);setShowMenu(!showMenu)}} data-collapse-toggle="mobile-menu-2" type="button" 
        className="lg:hidden" aria-controls="mobile-menu-2" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <IconBurger size="40" color={"border rounded p-1 shadow"} />
      </button>
      <div className={`absolute left-0 right-0 bottom-0 flex flex-col gap-5 bg-white/90 rounded-b mx-10 transform transition duration-500 origin-top translate-y-full ${showMenu ? 'scale-y-1' : 'scale-y-0'}`}>
        <ul className={`my-2 text-2xl font-medium lg:flex-row lg:space-x-8 lg:mt-0 transform transition duration-500 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>
          <MenuItem setShowMenu={setShowMenu} label={content?.home} item={1} />
          <MenuItem setShowMenu={setShowMenu} label={content?.area} item={2} />
          <MenuItem setShowMenu={setShowMenu} label={content?.rentals} item={3} />
          <MenuItem setShowMenu={setShowMenu} label={content?.contact} item={4} />
        </ul>
        {languages && <Language languages={languages} setLanguage={setLanguage} />}
      </div>
    </div>
  )
}

export const Menu = ({content,languages,setLanguage}:{content?:TextNavigation,languages?:string[],setLanguage:(language:string)=>void}) => {
  return (
    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
      {languages && <Language languages={languages} setLanguage={setLanguage} />}
      <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
        <MenuItem label={content?.home} item={1} />
        <MenuItem label={content?.area} item={2} />
        <MenuItem label={content?.rentals} item={3} />
        <MenuItem label={content?.contact} item={4} />
      </ul>
    </div>
  )
}

const MenuItem = ({label,item,setShowMenu}:{label?:string,item:number,setShowMenu?:(showMenu:boolean)=>void}) => {
  const contextValue = useContext(RentalsContext)
  const { setShowRental } = contextValue as AppContext
  let link:string = (item === 1) ? "/" : (item === 2) ? "/area" : (item === 3) ? "/rentals" : (item === 4) ? "/contact" :"/"
  
  return (
    label && label.length > 0 && 
      <li className="hover:bg-yellow-100 px-3 py-2 w-full text-center cursor-pointer">
        <Link onClick={()=>{setShowRental(null);setShowMenu ? setShowMenu(false) : null}} to={link}>{label}</Link>
      </li>
  )
}

export const Language = ({languages,setLanguage}:{languages?:string[],setLanguage:(language:string)=>void}) => {
  const contextValue = useContext(RentalsContext)
  const { language } = contextValue as AppContext

  // ============ not pretty =================
  const fixLanguagesArray = (languages:string[]) => languages.map((str) => (str === 'en' ? 'GB' : str.toUpperCase()))
  const fixSelectedLanguage = (language:string) => language === 'en' ? 'GB' : language.toUpperCase()
  const fixSelectLanguage = (language:string) => language === 'gb' ? setLanguage('en') : setLanguage(language)
  // =========================================
  
  if (languages) {
    return (
      <ReactFlagsSelect
        countries={fixLanguagesArray(languages)}
        selected={fixSelectedLanguage(language)} 
        onSelect={code=>fixSelectLanguage(code.toLowerCase())}
        selectedSize={20}
        optionsSize={20}
        className="p-3 mb-2"
      />
    )
  }
}

const MenuButtons = () => {

  return (
    <div className="flex items-center gap-2 ml-1">
      <div className="border rounded p-1 shadow"><IconEmail size="30" color={""} /></div>
      <div className="border rounded p-1 shadow"><IconPhone size="30" color={""} /></div>
    </div>
  )
}

const Navigation = (
    {content,setLanguage,scrolledHalfway,setScrolledHalfway}:
    {content?:ContentNavigation,setLanguage:(language:string)=>void,scrolledHalfway:boolean,setScrolledHalfway:(scrolledHalfway:boolean)=>void}
) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext
  const { navigation, languages } = content || {}
  
  return (
    <header className={`my-2 mx-4 z-50 fixed top-0 right-0 tranform duration-1000 left-0 `} >
      <div className="bg-white/90 rounded relative flex justify-end items-center max-w-screen-xl p-2 shadow-lg">
        <div className={`absolute p-3 text-2xl w-full font-semibold whitespace-nowrap tranform duration-1000 ${scrolledHalfway ? "opacity-100" : "opacity-0"} `}>
          <Link to='/'>
            {navigation?.title}
          </Link>
        </div>
        <div className={`absolute p-3 text-2xl w-full font-semibold whitespace-nowrap tranform duration-1000 ${!scrolledHalfway ? "opacity-100" : "opacity-0"} `}>
          <Link to='/contact'>
            <MenuButtons />
          </Link>
        </div>
        <nav className="flex gap-2 items-center justify-center">
          <Menu content={navigation} languages={languages} setLanguage={setLanguage} />
          <MenuHamburger content={navigation} languages={languages} setLanguage={setLanguage} scrolledHalfway={scrolledHalfway} setScrolledHalfway={setScrolledHalfway} />
          {password && <Edit section={1} />}
        </nav>
      </div>
    </header>
  )
}

export default Navigation
