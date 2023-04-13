import React from 'react'

const RegistrationCard = ({image, title, description, link}) => {
  return (
    <div className='card' style={{ width: '18rem' }}>
      <img src={image} className='card-img-top reg-img' alt='...' />
      <div className='card-body'>
        <h5 className='card-title'>Register as a {title}</h5>
        <p className='card-text'>
          {description}
        </p>
        <a href={link} className='btn btn-primary'>
          Register {title}
        </a>
      </div>
    </div>
  )
}

export default RegistrationCard