import { createContext } from 'react'
import Admin from './Admin'
import './App.css'
import Area, { TextArea } from './Area'
import Hero, { TextHero } from './Hero'
import Navigation, { TextNavigation } from './Navigation'
import Rentals, { TextRentals } from './Rentals'
import Contact, { TextContact } from './Contact'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import IconAdmin from './shared/icons/IconAdmin'
import { FetchData } from './constants/constants'
import PopupMessage from './shared/PopupMessage'
import Loading from './Loading'

export interface AppContext {
  password:string|null|undefined;
  language:string;
  editingSection:number;
  setEditingSection:(editingSection:number)=>void;
  setShowLoading:(showLoading:boolean)=>void;
  setMessage:(message:Message)=>void;
  siteContents:SiteContents|null|undefined;
  setSiteContents:(siteContents:SiteContents|null|undefined)=>void;
}

export interface SiteContents {
  navigation: TextNavigation;
  hero: TextHero;
  area: TextArea;
  rentals: TextRentals;
  contact: TextContact;
  languages: string[];
}

export const RentalsContext = createContext<AppContext|null>(null)

export interface Message {
  error: boolean;
  message: string;
}

const App = () => {
  //@ts-ignore
  const [lockScroll,setLockScroll]=useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [scrolledHalfway, setScrolledHalfway] = useState<boolean>(false)
  const [editingSection, setEditingSection] = useState<number>(0)
  const [password,setPassword] = useState<string|null|undefined>("")
  const [showAdmin,setShowAdmin] = useState<boolean>(false)
  const [siteContents,setSiteContents] = useState<SiteContents|null|undefined>()
  const [language,setLanguage] = useState<string>(navigator.language)
  const [message,setMessage] = useState<Message|null>(null)
  const [showLoading,setShowLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {      
      const windowHeight = window.innerHeight
      const scrollPosition = window.scrollY
      const halfwayPoint = windowHeight / 2.6

      setScrolledHalfway(scrollPosition >= halfwayPoint)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (lockScroll) {
      setScrollPosition(window.scrollY)
      document.body.classList.add('h-screen')
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('h-screen')
      document.body.classList.remove('overflow-hidden')

      window.scrollTo(0, scrollPosition)
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
      document.body.classList.remove('h-screen')
    }
  }, [lockScroll, scrollPosition])

  useEffect(()=>{
    FetchData(language.split('-')[0])
    .then(data=>{
      setSiteContents(data)
    })
  },[language])
  
  const contextValue = {password, siteContents, language, editingSection, setEditingSection, setShowLoading, setMessage, setSiteContents}
  
  if (siteContents) {
    return (
      <RentalsContext.Provider value={contextValue}>
        <div className='relative'>
          <Navigation scrolledHalfway={scrolledHalfway} content={{navigation:siteContents.navigation, languages:siteContents.languages}} setLanguage={setLanguage} />
          <Hero scrolledHalfway={scrolledHalfway} content={siteContents.hero} />
          <Area content={siteContents.area} setLockScroll={setLockScroll} />
          <Rentals content={siteContents.rentals} setLockScroll={setLockScroll} />
          <Contact content={siteContents.contact} />
          <Footer content={{contact: siteContents.contact, navigation:siteContents.navigation, languages:siteContents.languages}} setLanguage={setLanguage} />
          {!password && <IconAdmin showAdmin={showAdmin} setShowAdmin={setShowAdmin} size={"80"} color={"text-black"} /> }
          {showAdmin && <Admin setMessage={setMessage} setShowAdmin={setShowAdmin} setPassword={setPassword} />}
          <PopupMessage message={message} setMessage={setMessage} />
          <Loading showLoading={showLoading} setLockScroll={setLockScroll} />
        </div>
      </RentalsContext.Provider>
    )
  } else {
    return <div>Loading................</div>
  }
}

export default App
