import { lazy, useContext, useState } from "react"
import { AppContext, RentalsContext } from "./Home"
import Edit from "./shared/Edit"
import { Link, useNavigate } from "react-router-dom"
import IconEmail from "./shared/icons/IconEmail"
import IconPhone from "./shared/icons/IconPhone"
import IconBurger from "./shared/icons/IconBurger"
import { IoChevronBackOutline, IoCloseOutline } from "react-icons/io5"

const ReactFlagsSelect = lazy(() => import('react-flags-select'))

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

const ButtonBack = () => {
  const contextValue = useContext(RentalsContext)
  const { showRental, setShowRental } = contextValue as AppContext

  const navigate = useNavigate()
  
  return (
    <div className={`absolute left-0 top-0 z-50 flex h-10 items-center justify-start duration-500 ml-2 mt-2
                     ${showRental === -1 ? "-translate-x-full" : "translate-x-0"}
                     `}
    >
      <button onClick={()=>{navigate('/rentals');setShowRental(-1)}} data-collapse-toggle="mobile-menu-2" type="button" 
        className="bg-white rounded-xl shadow-lg" aria-controls="mobile-menu-2" aria-expanded="false">
        <span className="sr-only">Back</span>
        <IoChevronBackOutline size="40" />
      </button>
    </div>
  )
}

const ButtonClose = ( {showMenu,setShowMenu,setLockScroll}:
  {showMenu:boolean,setShowMenu:(showMenu:boolean)=>void,setLockScroll:(lockScroll:boolean)=>void}
) => {

  return (
    <div className={`z-40 fixed left-2 top-2 duration-500 ${showMenu ? "translate-x-0" : "-translate-x-full"}`}>
      <button onClick={()=>{setLockScroll(false);setShowMenu(false);console.log("buttonclose")}} type="button" className="lg:hidden">
        <span className="sr-only">Close</span>
        <IoCloseOutline size="60" />
      </button>
    </div>
  )
}

const MenuHamburger = ({content,languages}:{content?:TextNavigation,languages?:string[]}) => {
  const contextValue = useContext(RentalsContext)
  const { showRental, setLockScroll } = contextValue as AppContext
  const [showMenu,setShowMenu] = useState<boolean>(false)

  return (
    <div className={`z-10 flex items-center lg:order-2 ${showRental === -1 ? "" : "hidden"}`}>
      <button onClick={()=>{setLockScroll(true);setShowMenu(true);console.log("MenuHamburger")}} type="button" 
        className="lg:hidden">
        <span className="sr-only">Open main menu</span>
        <IconBurger size="40" color={"border rounded p-1 shadow"} />
      </button>
      <div className={`z-50 fixed left-0 right-0 bottom-0 top-0 transform transition duration-500 ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <ButtonClose showMenu={showMenu} setShowMenu={setShowMenu} setLockScroll={setLockScroll} />
        <ul className={`h-screen bg-white/90 flex flex-col lg:flex-row items-center justify-center gap-10 text-4xl transform transition duration-1000 ${showMenu ? 'opacity-100' : 'opacity-0'}`}>
          <MenuItem setShowMenu={setShowMenu} label={content?.home} item={1} />
          <MenuItem setShowMenu={setShowMenu} label={content?.area} item={2} />
          <MenuItem setShowMenu={setShowMenu} label={content?.rentals} item={3} />
          <MenuItem setShowMenu={setShowMenu} label={content?.contact} item={4} />
        </ul>
        {languages && <Language languages={languages} />}
      </div>
    </div>
  )
}

export const Menu = ({content}:{content?:TextNavigation}) => {
  const contextValue = useContext(RentalsContext)
  const { password } = contextValue as AppContext
  return (
    <div className="relative hidden justify-between items-center w-full lg:block lg:pr-10">
      <ul className="flex flex-col mt-4 lg:text-2xl lg:flex-row lg:space-x-8 lg:mt-0 xl:text-xl">
        <MenuItem label={content?.home} item={1} />
        <MenuItem label={content?.area} item={2} />
        <MenuItem label={content?.rentals} item={3} />
        <MenuItem label={content?.contact} item={4} />
      </ul>
      {password && <Edit section={1} />}
    </div>
  )
}

const MenuItem = ({label,item,setShowMenu}:{label?:string,item:number,setShowMenu?:(showMenu:boolean)=>void}) => {
  const contextValue = useContext(RentalsContext)
  const { setShowRental } = contextValue as AppContext
  let link:string = (item === 1) ? "/" : (item === 2) ? "/area" : (item === 3) ? "/rentals" : (item === 4) ? "/contact" :"/"
  
  return (
    label && label.length > 0 && 
      <li className="hover:border-b hover:border-green-800 hover:transition-all hover:delay-100 hover:ease-in px-3 py-2 w-full text-center cursor-pointer">
        <Link onClick={()=>{setShowRental(-1);setShowMenu ? setShowMenu(false) : null;item === 1 && window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}} to={link}>{label}</Link>
      </li>
  )
}

export const Language = ({languages}:{languages?:string[]}) => {
  const contextValue = useContext(RentalsContext)
  const { language, setLanguage } = contextValue as AppContext

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
        selectedSize={16}
        optionsSize={16}
        className="p-0"
        customLabels={{ GB: "EN", FR: "FR", NL: "NL" }}
      />
    )
  }
}

const MenuButtons = () => (
  <div className="flex items-center gap-2 ml-1">
    <div className="border rounded p-1 shadow"><IconEmail size="30" color={""} /></div>
    <div className="border rounded p-1 shadow"><IconPhone size="30" color={""} /></div>
  </div>
)

const Navigation = (
    {content,scrolledHalfway,doneLoading}:
    {content?:ContentNavigation,scrolledHalfway:boolean,doneLoading:boolean}
) => {
  const { navigation, languages } = content || {}
  const contextValue = useContext(RentalsContext)
  const { showRental } = contextValue as AppContext
  
  return (
    <header className={`z-50 fixed top-0 left-0 right-0 tranform duration-300 transition-all delay-500 ease-out ${doneLoading ? "translate-y-0" : "-translate-y-full"}`} >
      <div className={`${showRental === -1 ? "bg-white shadow border-b border-green-800" : ""} relative flex justify-between items-center lg:grid lg:grid-cols-4 p-2 lg:p-1`}>
        <div className={`
                          absolute left-1 p-3  text-xl md:text-3xl lg:text-2xl text-gray-600 whitespace-pre-line w-full tranform duration-500
                          ${scrolledHalfway ? "opacity-100" : "opacity-0"}
                          ${showRental !== -1 ? "translate-x-full lg:-translate-x-full" : "translate-x-0"}
                        `}>
          <Link to='/'>
            {navigation?.title}
          </Link>
        </div>
        
        <div className={`lg:hidden tranform duration-500 w-full z-10
                          ${scrolledHalfway || showRental !== -1 ? "hidden" : "block"}
                        `}>
          <Link to='/contact'>
            <MenuButtons />
          </Link>
        </div>
        
        <div className={`hidden lg:block lg:justify-self-start text-2xl font-semibold whitespace-nowrap tranform duration-500
                          ${scrolledHalfway || showRental !== -1 ? "opacity-0" : "opacity-100"}
                        `}>
          {languages && <Language languages={languages} />}
        </div>
        <nav className={`lg:col-span-3 lg:justify-self-end z-10 flex gap-2 items-center justify-center`}>
          {showRental === -1 && <Menu content={navigation} />}
          <MenuHamburger content={navigation} languages={languages} />
          <ButtonBack />
        </nav>
      </div>
    </header>
  )
}

export default Navigation
