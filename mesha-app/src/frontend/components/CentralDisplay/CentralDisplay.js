import {React, useState} from 'react'
import Tag from './pieces/Tag'
import AssociatedLinks from './pieces/AssociatedLinks';
import Description from './pieces/Description';

const CentralDisplay = () => {
  const [type, setType] = useState('doc');
  const [name, setName] = useState('Linear Hw');

  return (
    <div className='bg-[#faefd2] drop-shadow-md h-[80vh] w-[650px] rounded-md flex'>
      <div className='h-[100%] w-[70%] flex flex-col items-center py-[20px]'>
        <div className='flex  w-[90%] h-[100px] items-center justify-center gap-[120px]'>
          <Tag type={type} name={name}/>
          <div className='flex flex-col mt-[10px]'>
           <p className='text-[16px]'>12/20/2021</p>
           <p className='text-[13px]'>3:01 pm</p>
          </div>
        </div>

        <AssociatedLinks />
        <Description />
      </div>
      <div className='bg-red-700 w-[30%] h-[100%]'>

      </div>
    </div>
  )
}

export default CentralDisplay