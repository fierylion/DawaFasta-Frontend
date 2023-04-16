import React, { useEffect, useState } from "react";
const AppContext= React.createContext()
const AppProvider = ({children})=>{
 const [remMainNav, setRemMainNav] = useState(false);
 const [remUserNav, setRemUserNav] = useState(true);
 const [remCompNav, setRemCompNav] = useState(true);
 const [authenticatee, setAuthenticatee] = useState('');
 const [details, setDetails] = useState('')
 
 useEffect(()=>{
  const cache = JSON.parse(localStorage.getItem('DawaFasta'))
if (cache) {
  if (cache.isUser) {
    setAuthenticatee((user) => 'user')
    setDetails((det) => cache.user)
  } else {
    setAuthenticatee((comp) => 'company')
    setDetails((det) => cache.company)
  }
}
 }, [])
 
 return( <AppContext.Provider value={{ authenticatee, details, setAuthenticatee,setDetails,setRemMainNav,setRemCompNav, setRemUserNav, remMainNav, remCompNav, remUserNav}}>
  {children}
 </AppContext.Provider>)
}

const useMajorGlobalContext = ()=>{
 return React.useContext(AppContext);
}
export {AppContext, AppProvider, useMajorGlobalContext}