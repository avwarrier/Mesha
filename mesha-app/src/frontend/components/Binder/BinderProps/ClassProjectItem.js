import {React, useState, useEffect} from 'react'

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

const ClassProjectItem = (props) => {

    const [categoryName, setName] = useState('');
    const [onEdit, setOnEdit] = useState(true);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
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
    <div  className={onEdit ? ' rounded-sm h-[35px] w-[200px] my-[10px] flex items-center justify-between p-[10px] bg-[#ece1c1]' : ' rounded-sm h-[35px] w-[200px] my-[10px] flex items-center justify-between p-[10px] bg-[#ece1c1] cursor-pointer transition eas-in-out delay-90 hover:bg-[#d1c7ab] '}>
        <div className='flex items-center'>
            <SchoolIcon sx={{color: "#4a6a8f"}} onClick={() => props.setOpen(!props.open)}/>
            {
                onEdit ? 
                <input onKeyDown={handleKeyDown} value={categoryName} onChange={(e) => setName(e.target.value)} className='bg-[#faefd2] outline-none border-[1.3px] border-[#000] rounded-sm h-[25px] w-[100px] px-[3px] ml-[6px]'/>
                :
                <p onClick={() => props.setOpen(!props.open)} className={!props.open ? ' flex items-center  ml-[10px] w-[100px] ' : ' flex items-center ml-[5px] underline w-[100px]'}>{categoryName}</p>
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
                open={open}
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

export default ClassProjectItem