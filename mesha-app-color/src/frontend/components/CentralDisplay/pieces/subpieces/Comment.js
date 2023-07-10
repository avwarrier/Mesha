import React, { useEffect, useState, useRef } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditSharpIcon from '@mui/icons-material/EditSharp';

const Comment = (props) => {

    const [onEdit, setEdit] = useState(true);
    const [desc, setDesc] = useState('');
    const [prev, setPrev] = useState('');
    const [displayComment, setDisplayComment] = useState('');
    const itemInput = useRef(null);

    

    useEffect(() => {
            if (itemInput.current) {
            itemInput.current.focus();
        }
    }, [onEdit]);

    useEffect(() => {
        console.log("running")
        console.log("h" + props.comment.name)
        if(props.comment.name == 'default') {
            setDesc('');
            setDisplayComment('')
            setPrev('default');
            console.log('truedat')
            setEdit(true);
        } else {
            setDesc(props.comment.name);
            setDisplayComment(props.comment.name)
            setPrev(props.comment.name)
            setEdit(false)
        }
    }, [props.comment])

    const onEnter = (event) => {
        if (event.key === 'Enter') {

            if(desc.length >= 100) {
                setDisplayComment(desc.substring(0, 96) + '...');
            } else if(desc == '') {
                setEdit(true);
                return;
            } else {
                setDisplayComment(desc);
            }
            props.setComment(prev, desc);
            setPrev(desc);
            setEdit(false);
        }
    }

  return (
    <div className='w-[95%] m-auto bg-[#ffffff] shadow-md h-[85px] rounded-md flex flex-col justify-between mb-[10px]'>
        {
            onEdit ? 
                <textarea ref={itemInput} value={desc} onChange={(e) => {
                    setDesc(e.target.value);
                    setDisplayComment(e.target.value)
                }} onKeyDown={onEnter} placeholder='comment' className='outline-none h-[73%] rounded-md  resize-none w-[100%] p-[5px] text-[13px] placeholder:font-light placeholder:text-[#6d6b69]'/>
            :
                <p className=' outline-none h-[72%] rounded-md  w-[100%] p-[5px] text-[13px]'>{displayComment}</p>
        }
        <div className='flex gap-[10px] ml-[10px] items-center mb-[5px]'>
            <p className='text-[12px] text-[#000]'>{props.comment.date}</p>
            <p className='text-[13px] text-[#000] font-light'>{props.comment.time}</p>
            <div className='gap-[0px] flex justify-center items-center'>
            
                <div onClick={() => setEdit(true)} className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer transition eas-in-out delay-90 hover:bg-[#eaeaea] hover:drop-shadow-lg ml-[20px]'>
                    <EditSharpIcon sx={{fontSize: "15px"}} />
                </div>
            
                

            <div onClick={() => props.deleteComment(desc)} className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer transition eas-in-out delay-90 hover:bg-[#eaeaea] hover:drop-shadow-lg'>
                <DeleteIcon sx={{fontSize: "15px"}}/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Comment