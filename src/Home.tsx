import React, { useRef, createContext, useEffect, useState } from 'react'
import Admin from './Admin'
import Area, { TextArea } from './Area'
import Hero, { TextHero } from './Hero'
import Navigation, { TextNavigation } from './Navigation'
import Rentals, { TextRentals } from './Rentals'
import Contact, { TextContact } from './Contact'
import Footer from './Footer'
import { FetchData } from './constants/constants'
import PopupMessage from './PopupMessage'
import Loading from './Loading'
import EditForm from './shared/EditForm'

export interface AppContext {
  password:string|null|undefined;
  language:string;
  setLanguage:(language:string)=>void;
  editingSection:number;
  setEditingSection:(editingSection:number)=>void;
  setShowLoading:(showLoading:boolean)=>void;
  setMessage:(message:Message|null)=>void;
  siteContents:SiteContents|null|undefined;
  setSiteContents:(siteContents:SiteContents|null|undefined)=>void;
  section:number|undefined;
  showRental:number;
  setShowRental:(showRental:number)=>void;
  setLockScroll:(lockScroll:boolean)=>void;
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

interface HomeProps {
  section: number;
  params?: {
    rentalId?: string; 
  };
}

const Home: React.FC<HomeProps> = ({section}) => {
  const [lockScroll,setLockScroll]=useState<boolean>(false)
  const [scrolledHalfway, setScrolledHalfway] = useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [editingSection, setEditingSection] = useState<number>(0)
  const [password,setPassword] = useState<string|null|undefined>()
  const [showAdmin,setShowAdmin] = useState<boolean>(false)
  const [siteContents,setSiteContents] = useState<SiteContents|null|undefined>()
  const [language,setLanguage] = useState<string>(navigator.language)
  const [message,setMessage] = useState<Message|null>(null)
  const [showLoading,setShowLoading] = useState<boolean>(false)
  const [doneLoading,setDoneLoading] = useState<boolean>(false)
  const [showRental, setShowRental] = useState<number>(-1)

  const homeRef = useRef<HTMLDivElement>(null)
  const areaRef = useRef<HTMLDivElement>(null)
  const rentalsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePopstate = (event: { preventDefault: () => void }) => {
      event.preventDefault()
      setShowRental(-1)
      window.history.replaceState(null, '', window.location.href)
    }

    window.addEventListener('popstate', handlePopstate)
    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const halfwayPoint = windowHeight / 2.6
      setScrolledHalfway(scrollPosition >= halfwayPoint)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])  

  useEffect(() => {
    const delayedFunction = () => {
      setDoneLoading(true)
    }
    const timeoutId = setTimeout(delayedFunction, 500)
    return () => clearTimeout(timeoutId)
  }, [])
    
  useEffect(() => {
    if (showRental > -1) {
      setLockScroll(true)
    } else {
      setLockScroll(false)
    }
  }, [showRental])
    
  useEffect(() => {
    if (!lockScroll) {    
      window.scrollTo({
        top: scrollPosition
      })
    }
  }, [lockScroll])
    
  useEffect(()=>{
    FetchData(language.split('-')[0])
    .then(data=>{
      setSiteContents(data)
    })
  },[language])
  
  const contextValue = {
    password, 
    siteContents, setSiteContents,
    language, setLanguage, 
    editingSection, setEditingSection, 
    setShowLoading, 
    setMessage, 
    section, 
    showRental, setShowRental, 
    setLockScroll
  }

  if (section) {
    if (section === 1) {
      window.requestAnimationFrame(() => 
        homeRef.current?.scrollIntoView({behavior:'smooth'})
      )  
    } else if (section === 2) {
      window.requestAnimationFrame(() => 
        areaRef.current?.scrollIntoView({behavior:'smooth'})
      )  
    } else if (section === 3) {
      window.requestAnimationFrame(() => 
        rentalsRef.current?.scrollIntoView({behavior:'smooth'})
      )  
    }  else if (section === 4) {
      window.requestAnimationFrame(() => 
        contactRef.current?.scrollIntoView({behavior:'smooth'})
      )  
    } 
  }
  
  return (
    <RentalsContext.Provider value={contextValue}>
      <div ref={homeRef} className={`relative ${lockScroll ? "overflow-y-hidden h-screen" : ""}`}>
        <Navigation doneLoading={doneLoading} scrolledHalfway={scrolledHalfway} content={{navigation:siteContents?.navigation, languages:siteContents?.languages}} />
        <Hero scrolledHalfway={scrolledHalfway} doneLoading={doneLoading} content={siteContents?.hero} />
        <Area ref={areaRef} content={siteContents?.area} />
        <Rentals ref={rentalsRef} content={siteContents?.rentals} setScrollPosition={setScrollPosition} />
        <Contact ref={contactRef} content={siteContents?.contact} />
        <Footer showAdmin={showAdmin} setShowAdmin={setShowAdmin} />
        {showAdmin && <Admin setShowAdmin={setShowAdmin} setPassword={setPassword} />}
        <PopupMessage message={message} />
        <Loading showLoading={showLoading} />
        {editingSection > 0 && <EditForm />}
      </div>
    </RentalsContext.Provider>
  )
}


export default Home
