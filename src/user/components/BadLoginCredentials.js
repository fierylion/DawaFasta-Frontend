import React, {useRef} from 'react'


const BadLoginCredentials = ({info}) => {
const mainRef = useRef()
  return (
    <section ref={mainRef} className='invalid-credentials'>
      <div
        className={`alert alert-danger alert-dismissible fade show`}
        role='alert'
      >
        <small className='me-2'>{info}</small>
        <button
          type='button '
          className='close btn btn-danger'
          data-dismiss='alert'
          onClick={() => mainRef.current.remove()}
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    </section>
  )
}

export default BadLoginCredentials