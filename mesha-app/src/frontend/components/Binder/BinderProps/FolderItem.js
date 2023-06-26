import {React, useState, useEffect, useRef, useCallback} from 'react'
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
import SchoolIcon from '@mui/icons-material/School';
import EditNoteIcon from '@mui/icons-material/EditNote';
import docsLogo from '../../../assets/docsLogo.png'
import NotesIcon from '@mui/icons-material/Notes';
import LinkIcon from '@mui/icons-material/Link';

const FolderItem = (props) => {
    const [openAfterEdit, setOpenAfterEdit] = useState(false);

    const [onEdit, setOnEdit] = useState(false);
    const itemInput = useRef(null);
    const [categoryName, setName] = useState('');
    const [prevName, setPrevName] = useState('default');
    const [displayName, setDisplayName] = useState('');

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
            if(categoryName.length >= 14) {
                setDisplayName(categoryName.substring(0, 11) + '...');
            } else if(categoryName == '') {
                setUntitled(true);
                return;
        }
        props.setName(prevName, categoryName);
            setPrevName(categoryName);
            if(openAfterEdit) props.setOpen(true);
          setOpenAfterEdit(true);
          setOnEdit(false);
        }
    };

    const returnEdit = () => {
        if(categoryName.length >= 14) {
            setDisplayName(categoryName.substring(0, 11) + '...');
        } else if(categoryName == '') {
            setUntitled(true);
                return;
        }
        props.setName(prevName, categoryName);
        setPrevName(categoryName);
        if(openAfterEdit) props.setOpen(true);
      setOpenAfterEdit(true);
      setOnEdit(false);
    }

  return (
    <div style={{}}  className={onEdit ? 'my-[0px] rounded-sm h-[35px]  flex items-center justify-between px-[10px] ' : 'my-[0px] rounded-sm h-[35px]  flex items-center justify-between px-[10px]  cursor-pointer transition eas-in-out delay-90 hover:bg-[#d1c7ab]'}>
        <div className='flex items-center'>
            <FolderIcon onClick={() => props.setOpen(!props.open)} sx={{fontSize: '20px', marginRight: '2px', color: "#6a8099"}}/>
            {
                onEdit ? 
                <input ref={itemInput} onKeyDown={handleKeyDown} value={categoryName} onChange={(e) => {setName(e.target.value)
                    setDisplayName(e.target.value)
                }} className={!untitled ? 'bg-[#faefd2] outline-none border-[1.3px] border-[#000] rounded-sm h-[25px] w-[110px] px-[3px] ml-[1px]' : 'bg-[#faefd2] outline-none border-[1.5px] border-red-500 rounded-sm h-[25px] w-[110px] px-[3px] ml-[1px]'}/>
                :
                <p onClick={() => props.setOpen(!props.open)} className={!props.open ? ' flex items-center ml-[5px]  w-[130px] ' : ' flex items-center w-[130px] ml-[5px] underline '}>{displayName}</p>
            }
        </div>
        <div className='gap-[0px] flex justify-center items-center'>
            
                <div onClick={handleClick} className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer transition eas-in-out delay-90 hover:bg-[#ece1c1] hover:drop-shadow-lg'>
                    <MoreVertIcon sx={{fontSize: "15px"}} />
                </div>
            
                <Menu
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                anchorEl={anchorEl}
                open={opener}
                onClose={handleClose}
                onClick={handleClose}
                TransitionComponent={Fade}
                sx={
                    { "& .MuiMenu-paper": 
                      { backgroundColor: "#f3e8ca"}, 
                      
                    }
                  }
            >
                <MenuItem onClick={() => {
                    props.setOpen(false);
                    setOnEdit(true)
                    }} className='flex items-center gap-[10px] h-[30px]'>
                  <EditSharpIcon sx={{fontSize: '20x'}}/>
                  <p className=' font-light'>edit</p>
                </MenuItem>
                <MenuItem onClick={() => props.removeItem(categoryName)} className='flex items-center gap-[10px] h-[30px]'>
                  <DeleteIcon sx={{fontSize: '20px'}}/>
                  <p className=' font-light'>delete</p>
                </MenuItem>
                
            </Menu>

            <div onClick={handleClicks} className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer transition eas-in-out delay-90 hover:bg-[#ece1c1] hover:drop-shadow-lg'>
                <AddIcon sx={{fontSize: "15px"}}/>
            </div>
            <Menu
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
                      { backgroundColor: "#f3e8ca"}, 
                      
                    }
                  }
            >
                <MenuItem onClick={() => {
                    props.addItem(20)
                        props.setOpen(true);
                        returnEdit(false);
                    }} className='flex items-center gap-[10px] h-[30px]'>
                  <CreateNewFolderIcon sx={{color: "#6a8099"}}/>
                  <p className=' font-light'>Folder</p>
                </MenuItem>
                <MenuItem onClick={() => {
                    props.addItem(30)
                        props.setOpen(true);
                        returnEdit(false);
                    }}  className='flex items-center gap-[10px] h-[30px]'>
                <EditNoteIcon sx={{color: "#333"}}/>
                  <p className=' font-light'>Notebook</p>
                </MenuItem>
                <MenuItem onClick={() => {
                    props.addItem(40)
                        props.setOpen(true);
                        returnEdit(false);
                    }}  className='flex items-center gap-[10px] h-[30px]'>
                <img className='h-[18px] items-center justify-center flex' src={docsLogo}/>
                  <p className=' font-light'>Document</p>
                </MenuItem>
                <MenuItem onClick={() => {
                    props.addItem(50)
                        props.setOpen(true);
                        returnEdit(false);
                    }}  className='flex items-center gap-[10px] h-[30px]'>
                <LinkIcon sx={{color: "#c41a0e"}}/>
                  <p className=' font-light'>Link</p>
                </MenuItem>
                <MenuItem onClick={() => {
                    props.addItem(60)
                        props.setOpen(true);
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

export default FolderItem