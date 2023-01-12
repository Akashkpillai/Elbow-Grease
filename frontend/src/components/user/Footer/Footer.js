import React from 'react'
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';


function Footer() {
  return (
    <div>
      <MDBFooter className='text-center text-white p-4' style={{ backgroundColor: 'black' }}>
      <div className='text-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        ©  Copyright:
        
          Elbow-Grease india.in
       
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer