import React from 'react'
import logoplaceholderimage from '../assets/logo-placeholder-image.png'
import profilePlaceHolder from '../assets/profile-placeholder.png'

const NavBar = () => {

    const profileClicked = () => {
        
    }

  return (
    <div className='h-[70px] drop-shadow-md bg-[#faefd2] flex items-center justify-between'>
        <div className='flex gap-[15px] items-center ml-[30px]'>
            <img alt='logo' className='h-[10.5vh]' src={logoplaceholderimage}/>
            <p className='text-[25px]'>Mesha</p>
        </div>
        <div className='mr-[30px]'>
            <img alt='profile' onClick={profileClicked} className='h-[7.5vh] cursor-pointer' src={profilePlaceHolder}/>
        </div>
    </div>
  )
}

export default NavBar