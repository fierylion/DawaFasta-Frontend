import React, {useState, useEffect } from 'react'
import dawaFasta from '../../dawafastaAPI';
import { useMajorGlobalContext } from '../../context';
import { useParams } from 'react-router-dom';
import timeFormatter from '../../timeFormatter';
import LoadingSpinner from '../../components/Loading'

const Orders = () => {
 const [loading, setLoading ] = useState(false);
 const [history, setHistory] = useState([])
 const[load, setLoad] = useState(false)
 const [medicineName, setMedicineName] = useState('');
 const {details} = useMajorGlobalContext();
 const {MedID, company} = useParams()
 useEffect(
  ()=>{
   const fetchHistory = async ()=>{
    try{
     setLoading(true)
     if(details){
    const {data} = await dawaFasta.get(`/company/${details.company_id}/medicine/${MedID}/sales`, 
    {
     headers: {
      Authorization: 'Bearer ' + details.token,
     }
    }
    
    )
    const obtainedData = [...data.data]
    obtainedData.sort((a, b) => {
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
   setMedicineName(data.name)
   }} catch(err){
    console.log(err)

    }
    finally{
     setLoading(false)
    }

   
   }
   fetchHistory()
  }, [details, load, MedID]
 )
 if (loading)
   return (
     <div className='d-flex justify-content-center mt-5'>
       <LoadingSpinner />
     </div>
   ) 
   const handleShipment = (e, id)=>{
    const inner = e.target.innerText;
    const updateStatus = async () => {
      try {
        setLoading(true)
        if (details) {
          const { data } = await dawaFasta.get(
            `/company/${details.company_id}/medicine/${MedID}/sales`,
            {
              params:{sale:id,
              status:(inner==='Shipped')?'Shipped':'pending',
              },
              headers: {
                Authorization: 'Bearer ' + details.token,
              },
            }
          )
        
          console.log(data)
          setLoad(!load)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    updateStatus()

   }

  return (
    <section className='container mt-5'>
      <article>
        <h1 className='text-muted mt-3'>Hi, {company && company}</h1>
        <p className='text-info'>
          Orders made for <b> {medicineName && medicineName} </b>medicine!!
        </p>
      </article>
      <table className='table table-dark table-striped'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Amount Bought</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {history.map((hist) => {
            const { id, customer_name, amount, time, status } = hist
            return (
              <tr key={id}>
                <td>{timeFormatter(time)}</td>
                <td>{customer_name}</td>
                <td>{amount}</td>
                <td>{status}</td>
                <td>
                  <button
                    className={`btn btn-${
                      status === 'pending' ? 'success' : 'danger'
                    }`}
                    onClick={(e) => handleShipment(e, id)}
                  >
                    {status === 'pending' ? 'Shipped' : 'Not Shipped'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default Orders