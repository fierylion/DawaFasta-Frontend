import React from 'react'
import AddMedicine from '../components/AddMedicine'
import{BiCartAdd} from 'react-icons/bi'
const Medicine = () => {
 const [modal, setModal] = React.useState(false);
  return (
    <section>
      {modal && (
        <section className='custom-modal'>
          <AddMedicine {...{setModal}} />
        </section>
      )}
      <div className='d-flex justify-content-center mt-5'>
        <button className='btn btn-primary btn-lg' onClick={() => setModal(true)}>
          <BiCartAdd /> Add Medicine
        </button>
      </div>
    </section>
  )
}

export default Medicine