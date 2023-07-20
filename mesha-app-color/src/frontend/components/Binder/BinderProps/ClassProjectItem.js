import {React, useState, useEffect, useRef} from 'react'

import AddIcon from '@mui/icons-material/Add';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SubjectIcon from '@mui/icons-material/Subject';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import EditNoteIcon from '@mui/icons-material/EditNote';
import docsLogo from '../../../assets/docsLogo.png'
import NotesIcon from '@mui/icons-material/Notes';
import LinkIcon from '@mui/icons-material/Link';

const ClassProjectItem = (props) => {
    const [openAfterEdit, setOpenAfterEdit] = useState(false);

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
            if(onEdit) {
                if(categoryName != '') {
                    setOnEdit(false);
                } else {
                props.removeItem(props.id);
                console.log('done');
                }
            }
        }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClickOutside, onEdit ]);

    

    useEffect(() => {
        console.log(onEdit)
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
            if(props.name.length >= 17) {
                setDisplayName(props.name.substring(0, 14) + '...');
            } else {
                setDisplayName(props.name);
            }
        }
    }, [props.name]);

    

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEls, setAnchorEls] = useState(null);
    const opens = Boolean(anchorEls);
    const handleClicks = (event) => {
        setAnchorEls(event.currentTarget);
    };
    const handleCloses = () => {
        setAnchorEls(null);
    };
    const [untitled, setUntitled] = useState(false);
    

    const handleKeyDown = event => {
        console.log('User pressed: ', event.key);
    
        if (event.key === 'Enter') {
            console.log(categoryName)
            if(categoryName.length >= 17) {
                setDisplayName(categoryName.substring(0, 14) + '...');
            } else if(categoryName == '') {
                setUntitled(true);
                return;
            } else {
                setDisplayName(categoryName);
            }
            
            props.setName(props.id, '', categoryName);
            setPrevName(categoryName);
          setOnEdit(false);
          if(openAfterEdit) props.setOpen(props.id, true);
          setOpenAfterEdit(true);
        }
    };

    const returnEdit = () => {
        if(categoryName.length >= 17) {
            setDisplayName(categoryName.substring(0, 14) + '...');
        } else if(categoryName == '') {
            setUntitled(true);
                return;
        }
        props.setName(props.id, '', categoryName);
            setPrevName(categoryName);
            if(openAfterEdit) props.setOpen(props.id, true);
          setOpenAfterEdit(true);
          setOnEdit(false);
    }


  return (
    <div ref={ref} className={onEdit ? 'shadow-sm rounded-lg h-[40px] w-[250px]  flex items-center justify-between p-[10px] bg-[#f1f1f1]' : 'shadow-sm rounded-lg h-[40px] w-[250px] flex items-center justify-between p-[10px] bg-[#f1f1f1] cursor-pointer  hover:bg-[#dadada] '}>
        <div className='flex items-center'>
            <SchoolIcon sx={{color: "#4a6a8f"}} onClick={() => props.setOpen(props.id, !props.open)}/>
            {
                onEdit ? 
                <input ref={itemInput} onKeyDown={handleKeyDown} value={categoryName} onChange={(e) => {setName(e.target.value)
                    setDisplayName(e.target.value)
                    if(untitled) setUntitled(false);
                }} className={!untitled ? 'bg-[#ffffff] outline-none border-[1.3px] border-[#000] rounded-sm h-[25px] w-[130px] px-[3px] ml-[6px]' : 'bg-[#ffffff] outline-none border-[1.5px] border-red-500 placeholder:text-red-700 rounded-sm h-[25px] w-[130px] px-[3px] ml-[6px]'}/>
                :
                <p onClick={() => props.setOpen(props.id, !props.open)} className={!props.open ? ' flex items-center  ml-[10px] w-[130px] select-none' : ' flex items-center ml-[10px] underline w-[130px] select-none'}>{displayName}</p>
            }
        </div>
        <div className='gap-[0px] flex justify-center items-center'>

                <div onClick={handleClick} className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer  hover:bg-[#eaeaea] hover:drop-shadow-lg'>
                    <MoreVertIcon sx={{fontSize: "15px"}} />
                </div>
                
                <Menu
                elevation={3}
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                TransitionComponent={Fade}
                sx={
                    { "& .MuiMenu-paper": 
                      { backgroundColor: "#ffffff", borderRadius: "10px", width: "110px", paddingX: "5px"}, 
                      
                    }
                  }
            >
                <MenuItem sx={{borderRadius: "5px",}} onClick={() => {
                    props.setOpen(props.id, false);
                    setOnEdit(true)
                    }} className='flex items-center gap-[10px] h-[30px]'>
                  <EditSharpIcon sx={{fontSize: '20x'}}/>
                  <p className=' font-light'>edit</p>
                </MenuItem>
                <MenuItem sx={{borderRadius: "5px",}} onClick={() => {
                    console.log(categoryName);
                    props.removeItem(props.id)
                }} className='flex items-center gap-[10px] h-[30px]'>
                  <DeleteIcon sx={{fontSize: '20px'}}/>
                  <p className=' font-light'>delete</p>
                </MenuItem>
                
            </Menu>
            
            
            
            <div onClick={handleClicks} className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer  hover:bg-[#eaeaea] hover:drop-shadow-lg'>
                <AddIcon sx={{fontSize: "15px"}}/>
            </div>
            <Menu
            elevation={3}
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                anchorEl={anchorEls}
                open={opens}
                onClose={handleCloses}
                onClick={handleCloses}
                TransitionComponent={Fade}
                sx={
                    { "& .MuiMenu-paper": 
                      { backgroundColor: "#ffffff", borderRadius: "10px", width: "140px", paddingX: "5px"}, 
                      
                    }
                  }
            >
                <MenuItem sx={{borderRadius: "5px"}} onClick={() => {
                    props.addItem(20)
                        props.setOpen(props.id, true);
                        returnEdit(false);
                    }} className='flex items-center gap-[10px] h-[30px]'>
                  <CreateNewFolderIcon sx={{color: "#6a8099"}}/>
                  <p className=' font-light'>Folder</p>
                </MenuItem>
                <MenuItem sx={{borderRadius: "5px"}} onClick={() => {
                    props.addItem(30)
                        props.setOpen(props.id, true);
                        returnEdit(false);
                    }}  className='flex items-center gap-[10px] h-[30px]'>
                <EditNoteIcon sx={{color: "#333"}}/>
                  <p className=' font-light'>Notebook</p>
                </MenuItem>
                <MenuItem sx={{borderRadius: "5px"}} onClick={() => {
                    props.addItem(40)
                        props.setOpen(props.id, true);
                        returnEdit(false);
                    }}  className='flex items-center gap-[10px] h-[30px]'>
                <img className='h-[18px] items-center justify-center flex' src={docsLogo}/>
                  <p className=' font-light'>Document</p>
                </MenuItem>
                <MenuItem sx={{borderRadius: "5px"}} onClick={() => {
                    props.addItem(50)
                        props.setOpen(props.id, true);
                        returnEdit(false);
                    }}  className='flex items-center gap-[10px] h-[30px]'>
                <LinkIcon sx={{color: "#c41a0e"}}/>
                  <p className=' font-light'>Link</p>
                </MenuItem>
                <MenuItem sx={{borderRadius: "5px"}} onClick={() => {
                    props.addItem(60)
                        props.setOpen(props.id, true);
                        returnEdit(false);
                    }}  className='flex items-center gap-[10px] h-[30px]'>
                <NotesIcon sx={{color: "#222"}}/>
                  <p className=' font-light'>Note</p>
                </MenuItem>
                
            </Menu>
        </div>
    </div>
  )
}

export default ClassProjectItem