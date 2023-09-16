import React from 'react'

function UthLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="w-full h-full flex justify-around items-center">{children}</div>
  )
}

export default UthLayout