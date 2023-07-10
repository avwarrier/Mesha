import {React, useEffect, useState} from 'react'
import docsLogo from '../../../assets/docsLogo.png'
import LinkIcon from '@mui/icons-material/Link';

const Tag = (props) => {

    const [name, setName] = useState('');
      
    useEffect(() => {
      setName(props.name);
    }, [props.name])

  if(props.type == 'document') {
    return (
        <div className='w-[220px] shadow-md h-[70%] rounded-lg flex items-center justify-center gap-[10px]'>
            <img className='h-[40px] items-center justify-center flex' src={docsLogo}/>
            <p className='text-[20px] font-light mt-[8px]'>{name}</p>
        </div>
      )
  } else if(props.type == 'link') {
    return (
      <div className='w-[220px] shadow-md h-[70%] rounded-lg flex items-center justify-center gap-[10px]'>
      <LinkIcon sx={{fontSize: '40px', color: "#c41a0e", marginTop: "10px"}}/>
      <p className='text-[20px] font-light mt-[8px]'>{name}</p>
  </div>
      )
  }
}

export default Tag