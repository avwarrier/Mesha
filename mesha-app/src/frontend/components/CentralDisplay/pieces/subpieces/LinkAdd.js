import {React, useEffect, useState, useRef} from 'react'
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';

const LinkAdd = (props) => {
 
    const [link, setLink] = useState('');
    const [displayLink, setDisplayLink] = useState('');
    const [edit, setEdit] = useState(true);
    const ref = useRef(null);
    const itemInput = useRef(null);

    

    useEffect(() => {
        console.log(edit)
            if (itemInput.current) {
            itemInput.current.focus();
        }
    }, [edit]);

    useEffect(() => {
        if(props.link == 'default') {
            console.log("hello worlds")
            setDisplayLink('');
            setLink('')
            setEdit(true);
            return;
        }
        if(link.length >= 30) {
            setDisplayLink(link.substring(0, 26) + '...');
            setLink(props.link);
        }
    }, [props.link])

    const onEnter = event => {
    
        if (event.key === 'Enter') {

            if(link.length >= 20) {
                setDisplayLink(link.substring(0, 16) + '...');
            } else if(link == '') {
                setEdit(true);
                return;
            } else {
                setDisplayLink(link);
            }
            props.addLink(link);
            setEdit(false);
        }
    }

  return (
    <div ref={ref} className={edit ? 'bg-[#faefd2] w-[100%] h-[33px] flex items-center rounded-2xl px-[15px]' : 'w-[100%] h-[33px] flex items-center rounded-2xl px-[15px]'}>
        {edit ? <AddLinkOutlinedIcon  sx={{fontSize: '22px', marginRight: "10px", color: "#3a4754"}}/> : <LinkIcon  sx={{fontSize: '22px', marginRight: "10px", color: "#3a4754"}}/>}
        {edit ? 
            <input ref={itemInput} className='outline-none px-[5px] h-[25px] w-[70%] bg-[#faefd2] placeholder:text-[#6d6b69] placeholder:font-light border-b-[1.5px] border-[#4a6a8f]' onKeyDown={onEnter} value={link} onChange={(e) => {
                setLink(e.target.value);
                setDisplayLink(e.target.value)
            }} placeholder='add link'/>
        :
            <a href={link} target='_blank' className='px-[5px] h-[25px] w-[70%] text-[#4a6a8f] underline cursor-pointer'>{displayLink}</a>
        }
        {!edit &&
            <div onClick={() => props.deleteLink(link)} className='transition eas-in-out delay-90 hover:bg-[#fffad8] hover:drop-shadow-lg items-center justify-center flex cursor-pointer p-[2px] rounded-md'>
                <DeleteOutlinedIcon sx={{fontSize: "20px", color: "#3a4754"}}/>
            </div>
        }
    </div>
  )
}

export default LinkAdd