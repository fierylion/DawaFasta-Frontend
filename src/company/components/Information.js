import React, { useEffect, useRef } from 'react'

const Information = ({state, info, color, setState, setLoad,load}) => {
 const remove = useRef();
 const delay =(ms)=> new Promise(resolve=>setTimeout(resolve, ms));

 useEffect(
  ()=>{
    const infoFunction = async ()=>{
      if (color === 'danger' && info) {
        await delay(2000)
        setState({ state: false, message: '', color:'' })
        if(setLoad)
        setLoad(!load);
        
      } else if (color === 'success' && info) {
        await delay(1000)
        setState({color:'', state: false, message: '' })
        if(setLoad)
        setLoad(!load);
    }
  }
 infoFunction()
   
  }, [info]
 )
  return (

    <small ref={remove} className={`text-${color} `}>
     {state && info}
    </small>
  )
}

export default Information