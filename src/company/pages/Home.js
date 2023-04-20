import React, { useEffect, useState } from 'react'
import { useMajorGlobalContext } from '../../context'
import dawaFasta from '../../dawafastaAPI';
import SingleMedicine from '../components/SingleMedicine';
import Information from '../components/Information';
import LoadingSpinner from '../../components/Loading'
const Home = () => {
 const{details} = useMajorGlobalContext();
const [loading,setLoading ] = useState(false)
const [information, setInformation] = useState(null);
const [load, setLoad] = useState(false);
const [deleteLoad, setDeleteLoad] = useState({ state: false, message: '', color:'' })
 useEffect(() => {
   const fetchData = async () => {
     try {
       setLoading(true)
       if (details) {
         const { data } = await dawaFasta.get(`/company/${details.company_id}`, {
           headers: {
             Authorization: 'Bearer ' + details.token,
           },
         })
         console.log(data)
         setInformation(data)
         
       }
     } catch (err) {
       console.log(err)
     } finally {
       setLoading(false)
     }
   }
   fetchData();
  
 }, [details, load])
 if(loading)  return (
   <div className='d-flex justify-content-center mt-5'>
     <LoadingSpinner />
   </div>
 )
  return (
    <div>
      <article className='container'>
        <section>
          <h1 className='text-muted mt-3'>
            Hi, {information && information.Company.name}
          </h1>
          <small className='text-justify text-success'>
            "{information && information.Company.description}"
          </small>
        </section>

        <section className='my-2 text-center bg-dark rounded'>
          {deleteLoad.state && (
            <Information
              state={deleteLoad.state}
              info={deleteLoad.message}
              color={deleteLoad.color}
              setState={setDeleteLoad}
              load={load}
              setLoad={setLoad}
            />
          )}
        </section>
        <section className='row '>
          {information &&
            information.Medicines.map((med) => {
              const {
                id: medId,
                content: description,
                isSolid: solid,
                name,
                owners,
                manufactureDate: manufactured,
                manufacturerName: manufacturer,
                expiryDate: expiry,
              } = med.med
              return (
                <div className='col col-lg-4 col-md-6 ' key={medId}>
                  {' '}
                  <SingleMedicine
                    load={load}
                    setLoad={setLoad}
                    token={details.token}
                    compId={information.Company.id}
                    price={med.price}
                    setDeleteLoad={setDeleteLoad}
                    quantity={med.quantity}
                    {...{
                      name,
                      medId,
                      solid,
                      manufactured,
                      manufacturer,
                      expiry,
                      owners,
                      description,
                    }}
                    {...med.info}
                  />
                </div>
              )
            })}
        </section>
      </article>
    </div>
  )
}

export default Home