import NavSidebar from '@/components/NavSidebar'
import React from 'react'

async function  layout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-full'>
      <div className='hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'>
        <NavSidebar/>
      </div>
      <main className='md:pl-[72px] w-full h-screen'>
        {children}
      </main>
    </div>
  )
}

export default layout