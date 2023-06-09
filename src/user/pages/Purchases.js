import React, {useState, useEffect } from 'react'
import dawaFasta from '../../dawafastaAPI';
import { useMajorGlobalContext } from '../../context';
import LoadingSpinner from '../../components/Loading'
import timeFormatter from '../../timeFormatter'
const Purchases = () => {
 const [loading, setLoading ] = useState(false);
 const [history, setHistory] = useState([])
 const {details} = useMajorGlobalContext();
 useEffect(
  ()=>{
   const fetchHistory = async ()=>{
    try{
     setLoading(true)
     if(details){
    const {data} = await dawaFasta.get(`/user/${details.user_id}/purchase/history`, 
    {
     headers: {
      Authorization: 'Bearer ' + details.token,
     }
    }
    )
    const obtainedData = [...data.data]
    obtainedData.sort((a, b) =>  {
      const date1 = new Date(a.time)
      const date2 = new Date(b.time)
      if (date1 < date2) {
        return 1
      } else if (date1 > date2) {
        return -1
      } else {
        return 0
      }
    })
   setHistory(obtainedData)
   }} catch(err){
    console.log(err)

    }
    finally{
     setLoading(false)
    }

   
   }
   fetchHistory()
  }, [details]
 )
 if(loading) return (
   <div className='d-flex justify-content-center mt-5'>
     <LoadingSpinner />
   </div>
 )

 return (
    <section className='container mt-5'>
      <table className='table table-dark table-striped'>
        <thead>
          <tr>
          <th>Date</th>
            <th>Medicine</th>
            <th>Company</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {history.map((hist)=>{
         const {id, medicine, company, amount, time, status } = hist;
         return (
           <tr key={id}>
             <td className='text-info'>
               <small>{timeFormatter(time)}</small>
             </td>
             <td>{medicine}</td>
             <td>{company}</td>
             <td>{amount}</td>
             <td
               className={`text-${status === 'pending' ? 'muted' : 'success'}`}
             >
               {status}
             </td>
           </tr>
         )

        })}

         
       
        </tbody>
      </table>
    </section>
  )
}

export default Purchases