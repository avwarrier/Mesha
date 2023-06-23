import {React, useState, useEffect} from 'react'
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

const FolderItem = () => {
    const [categoryName, setName] = useState('');
    const [onEdit, setOnEdit] = useState(true);
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const opener = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleKeyDown = event => {
        console.log('User pressed: ', event.key);
    
        if (event.key === 'Enter') {
          setOnEdit(false);
        }
    };

  return (
    <div  className={onEdit ? ' rounded-sm h-[35px] w-[170px] my-[10px] flex items-center justify-between p-[10px] ' : ' rounded-sm h-[35px] w-[170px] my-[10px] flex items-center justify-between p-[10px]  cursor-pointer transition eas-in-out delay-90 hover:bg-[#d1c7ab]'}>
        <div className='flex items-center'>
            <FolderIcon onClick={() => setOpen(!open)} sx={{fontSize: '20px', marginRight: '2px', color: "#6a8099"}}/>
            {
                onEdit ? 
                <input onKeyDown={handleKeyDown} value={categoryName} onChange={(e) => setName(e.target.value)} className='bg-[#faefd2] outline-none border-[1.3px] border-[#000] rounded-sm h-[25px] w-[70px] px-[3px] ml-[1px]'/>
                :
                <p onClick={() => setOpen(!open)} className={!open ? ' flex items-center ml-[5px]  w-[60px] ' : ' flex items-center w-[60px] ml-[5px] underline '}>{categoryName}</p>
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
                <MenuItem onClick={() => setOnEdit(true)} className='flex items-center gap-[10px] h-[30px]'>
                  <EditSharpIcon sx={{fontSize: '20x'}}/>
                  <p className=' font-light'>edit</p>
                </MenuItem>
                <MenuItem  className='flex items-center gap-[10px] h-[30px]'>
                  <DeleteIcon sx={{fontSize: '20px'}}/>
                  <p className=' font-light'>delete</p>
                </MenuItem>
                
            </Menu>

            <div className='flex justify-center items-center h-[20px] w-[20px] p-[5px] rounded-sm cursor-pointer transition eas-in-out delay-90 hover:bg-[#ece1c1] hover:drop-shadow-lg'>
                <AddIcon sx={{fontSize: "15px"}}/>
            </div>
        </div>
    </div>
  )
}

export default FolderItem