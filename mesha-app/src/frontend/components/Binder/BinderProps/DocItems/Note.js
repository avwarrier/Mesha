import {React, useState, useEffect, useRef} from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SubjectIcon from '@mui/icons-material/Subject';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import docsLogo from '../../../../assets/docsLogo.png'
import NotesIcon from '@mui/icons-material/Notes';

const Note = (props) => {
    const [onEdit, setOnEdit] = useState(false);
    const itemInput = useRef(null);
    const [categoryName, setName] = useState('');
    const [prevName, setPrevName] = useState('default');
    const [displayName, setDisplayName] = useState('');

    const ref = useRef(null);
    const { onClickOutside } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside && onClickOutside();
            console.log('jejej')
            console.log(onEdit)
            if(onEdit) {
                props.removeItem('default');
                console.log('done');
            };
        }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClickOutside, onEdit ]);

    useEffect(() => {
        
            if (itemInput.current) {
            itemInput.current.focus();
        }
    }, [onEdit]);

    useEffect(() => {
        setPrevName(props.name);
        if(props.name == 'default') { 
            setOnEdit(true);
        } else {
            setOnEdit(false);
            setName(props.name);
            if(props.name.length >= 12) {
                setDisplayName(props.name.substring(0, 9) + '...');
            } else {
                setDisplayName(props.name);
            }
        }
    }, []);
    

    const [anchorEl, setAnchorEl] = useState(null);
    const opener = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };


    const [untitled, setUntitled] = useState(false);

    const handleKeyDown = event => {
        console.log('User pressed: ', event.key);
    
        if (event.key === 'Enter') {

            if(categoryName.length >= 12) {
                setDisplayName(categoryName.substring(0, 9) + '...');
            } else if(categoryName == '') {
                setUntitled(true);
                return;
            } else {
                setDisplayName(categoryName);
            }
            props.setName(prevName, categoryName);
            setPrevName(categoryName);
            props.setPropOpen(categoryName, true);
          setOnEdit(false);
        }
    };

  return (
    <div ref={ref}  className={onEdit ? 'w-[100%] rounded-xl h-[30px] flex items-center justify-between p-[10px] ' : (!props.open ?  'w-[100%] rounded-xl h-[30px]  flex items-center justify-between p-[10px]  cursor-pointer transition eas-in-out delay-90 hover:bg-[#d1c7ab]' : 'w-[100%] rounded-xl h-[30px] flex items-center justify-between p-[10px]  cursor-pointer transition eas-in-out delay-90 bg-[#d1c7ab]')}>
        <div className='flex items-center'>
        <NotesIcon onClick={() => props.setPropOpen(categoryName, !props.open)} sx={{fontSize: '20px', marginRight: '2px', color: "#222"}}/>
            {
                onEdit ? 
                <input ref={itemInput} onKeyDown={handleKeyDown} value={categoryName} onChange={(e) => {setName(e.target.value)
                    setDisplayName(e.target.value)
                }} className={!untitled ? 'bg-[#faefd2] outline-none border-[1.3px] border-[#000] rounded-sm h-[25px] w-[110px] px-[3px] ml-[1px]' : 'bg-[#faefd2] outline-none border-[1.5px] border-red-500 rounded-sm h-[25px] w-[110px] px-[3px] ml-[1px]'}/>
                :
                <p onClick={() => props.setPropOpen(categoryName, !props.open)} className={!props.open ? ' flex items-center ml-[5px]  ' : ' flex items-center  ml-[5px]  '}>{displayName}</p>
            }
        </div>
        <div className='gap-[0px] flex justify-center items-center'>
            
                <div onClick={() => setOnEdit(true)} className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer transition eas-in-out delay-90 hover:bg-[#ece1c1] hover:drop-shadow-lg'>
                    <EditSharpIcon sx={{fontSize: "15px"}} />
                </div>
            
                

            <div onClick={() => props.removeItem(categoryName)} className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer transition eas-in-out delay-90 hover:bg-[#ece1c1] hover:drop-shadow-lg'>
                <DeleteIcon sx={{fontSize: "15px"}}/>
            </div>
        </div>
    </div>
  )
}

export default Note