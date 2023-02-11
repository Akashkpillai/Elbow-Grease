import React from 'react'
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div>
    <div className="mt-32">
      <Result
        status="error"
        title="404 error"
        subTitle="Page not found"
        extra={[
          <Link to={"/"}>
            <Button key="console">Go to Website</Button> 
          </Link>
        ]}
      />
    </div>
  </div>
  )
}

export default NoPage