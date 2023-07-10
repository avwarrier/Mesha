import React, { useState } from 'react'

const Description = () => {

    const [desc, setDesc] = useState('');
    const [edit, setEdit] = useState(true);

  return (
    <div className=' w-[90%] h-[27vh] mt-[20px]'>
            <textarea value={desc} onChange={(e) => {
                setDesc(e.target.value)
            }} placeholder='Description' className='h-[100%] w-[100%] p-[10px] resize-none outline-none bg-[#f0e4c4] placeholder:text-[#6d6b69] placeholder:font-light rounded-md border-b-[2px] border-[#4a6a8f]'/>
    
    </div>
  )
}

export default Description