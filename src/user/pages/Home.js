import React, { useEffect, useState } from 'react'
import dawaFasta from '../../dawafastaAPI'
import SingleMedicine from '../components/SingleMedicine'
import { useMajorGlobalContext } from '../../context'
const Home = () => {
 const [loading, setLoading] = useState(false)
 const [information, setInformation] = useState(null)
 const [load, setLoad] = useState(false)
 const {details} = useMajorGlobalContext();
 useEffect(() => {
   const fetchData = async () => {
    try{
    setLoading(true)
    if(details){
    const { data } = await dawaFasta.get(`/user/${details.user_id}`, {
     headers: {
      'Authorization': 'Bearer '+details.token
     }
    })
    setInformation(data.Medicines)
   }
    }catch(err){
     console.log(err)
    
    }
    finally{
     setLoading(false)
    }
   }
   fetchData()
 }, [details,load])
 if(loading) return <div>Loading.....</div>;
 
  return (
    <article className='container'>
      <section className='row '>
        {information &&
          information.map((med) => {
            const {
              id: medId,
              content: description,
              isSolid: solid,
              name,
              owners,
              manufactureDate: manufactured,
              manufacturerName: manufacturer,
              expiryDate: expiry,
            } = med.medicine
            return (
              <div className='col col-lg-4 col-md-6 '>
                {' '}
                <SingleMedicine
                  key={medId}
                  userId = {details.user_id}
                  userName = {details.user_name}
                  token={details.token}
                  compId = {med.company.id}
                  price={med.price}
                  quantity={med.quantity}
                  company={med.company.name}
                  comp_desc={med.company.description}
                  {...{ load, setLoad,
                    name,
                    medId, 
                    solid,
                    manufactured,
                    manufacturer,
                    expiry,
                    owners,description
                  }}
                />
              </div>
            )
          })}
      </section>
    </article>
  )
}

export default Home