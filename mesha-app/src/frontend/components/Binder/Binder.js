import {React, useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SubjectIcon from '@mui/icons-material/Subject';
import ClassProject from './ClassProject';
import Folder from './Folder';
import Notebook from './Notebook';
import SchoolIcon from '@mui/icons-material/School';

const Binder = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [items, setItems] = useState([]);

    const addItem = (num) => {
        if(num == 10) {
            setItems(oldItems => [...oldItems, {
                type: 'class/project',
                name: "default",
                components: []
            }]);
        } else if(num == 20) {
            setItems(oldItems => [...oldItems, {
                type: 'folder',
                name: "default",
                components: []
            }]);
        } else {
            setItems(oldItems => [...oldItems, {
                type: 'notebook',
                name: "default",
                components: []
            }]);
        }

        console.log(items);
    }

    const setName = (prevName, name) => {
        let temp = [...items];
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].name == prevName) {
                temp[i].name = name;
            }
        }
        setItems(temp);
    }

    const removeItem = (name) => {
        setItems(items.filter(item => item.name !== name));
    }

    const setComponents = (name, comps) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].name == name) {
                temp[i].components = comps;
            }
        }
        console.log(temp);
        setItems(temp);
    }

    

  return (
    <div className='bg-[#faefd2] drop-shadow-md h-[80vh] w-[300px] rounded-md flex flex-col items-center'>
        <div className='mt-[20px] h-[50px]  w-[250px] flex items-center justify-between rounded-lg'>
            <p className='ml-[20px] text-[25px] font-thin'>Binder</p>
            <div onClick={handleClick} className='rounded-[3px] mr-[20px] h-[30px] w-[30px] flex justify-center items-center cursor-pointer transition eas-in-out delay-140 hover:bg-[#ece1c1] hover:shadow-sm'>
                <AddIcon sx={{fontWeight: 'light'}}/>

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
                <MenuItem onClick={() => addItem(10)} className='flex items-center gap-[10px] h-[30px]'>
                  <SchoolIcon sx={{color: "#4a6a8f"}}/>
                  <p className=' font-light'>Class/Project</p>
                </MenuItem>
                <MenuItem onClick={() => addItem(20)} className='flex items-center gap-[10px] h-[30px]'>
                  <CreateNewFolderIcon sx={{color: "#6a8099"}}/>
                  <p className=' font-light'>Folder</p>
                </MenuItem>
                <MenuItem onClick={() => addItem(30)} className='flex items-center gap-[10px] h-[30px]'>
                <EditNoteIcon sx={{color: "#333"}}/>
                  <p className=' font-light'>Notebook</p>
                </MenuItem>
                
            </Menu>

            
        </div>
        <div className='gap-[17px] flex flex-col w-[250px]'>
            {
                items.map((item) => {
                    if(item.type === 'class/project') {
                        return <ClassProject components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName}/>
                    } else if (item.type === 'folder') {
                        return <Folder components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName}/>
                    } else {
                        return <Notebook components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName}/>
                    }
                })
            }
        </div>
    </div>
  )
}

export default Binder