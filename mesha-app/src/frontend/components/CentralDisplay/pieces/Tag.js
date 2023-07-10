import {React, useState} from 'react'
import docsLogo from '../../../assets/docsLogo.png'

const Tag = (props) => {

    

  if(props.type == 'doc') {
    return (
        <div className='w-[45%] shadow-md h-[70%] rounded-lg flex items-center justify-center gap-[10px]'>
            <img className='h-[40px] items-center justify-center flex' src={docsLogo}/>
            <p className='text-[20px] font-light'>{props.name}</p>
        </div>
      )
  } else if(props.type == 'link') {
    return (
        <div className='w-[60%] bg-blue-500 h-[90%]'>
    
        </div>
      )
  } else if(props.type == 'note') {
    return (
        <div className='w-[60%] bg-blue-500 h-[90%]'>
    
        </div>
      )
  }
}

export default Tag