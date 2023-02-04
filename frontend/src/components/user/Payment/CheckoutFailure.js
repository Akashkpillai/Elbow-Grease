import React from 'react'
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

function CheckoutFailure() {
  return (
    <div>
    <div className="mt-32">
      <Result
        status="error"
        title="Payment not successful"
        subTitle="Try Again!!"
        extra={[
          <Link to={""}>
            <Button key="console">Try Again</Button> 
          </Link>
        ]}
      />
    </div>
  </div>
  )
}

export default CheckoutFailure