import {React, useState} from 'react'
import ClassProjectItem from './BinderProps/ClassProjectItem'
import Folder from './Folder';

const ClassProject = () => {
    const [open, setOpen] = useState(false);

  return (
    <div className={!open ? 'bg-[#ece1c1] rounded-sm ' : 'bg-[#ece1c1] rounded-sm pb-[5px]'}>
        <ClassProjectItem open={open} setOpen={setOpen}/>
        {open && 
             <div className='ml-[20px]'>
             <Folder />
         </div>  
        }
    </div>
  )
}

export default ClassProject