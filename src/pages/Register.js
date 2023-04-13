import React from 'react'
import RegistrationCard from '../components/RegistrationCard'
import companyImage from '../images/company.jpg'
import customerImage from '../images/patient.png'
const Register = () => {
  return (
    <main >
     <section className='d-flex justify-content-center flex-wrap reg-section'>
      <div>
       <RegistrationCard image ={companyImage} title='Company' description={'Register as a company inorder to allow customers to buy from you and put your medicine listings'} link='company/register'/>
      </div>
      <div>
        <RegistrationCard image={customerImage} title={'Customer'} description={'Register as a customer inorder to allow you to buy from various collection of companies thanks'} link='user/register'/>
      </div>
     </section>
    </main>
  )
}

export default Register