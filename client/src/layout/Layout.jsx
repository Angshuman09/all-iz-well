import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='container mx-auto w-full h-screen bg-amber-700'>{children}</div>
  )
}

export default Layout