import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const accesstoken = sessionStorage.getItem("accesstoken")
  return (
    <div>
      {accesstoken ? <Fragment>{children}</Fragment> : <Navigate to={"/"}/>}
    </div>
  )
}

export default PrivateRoute
