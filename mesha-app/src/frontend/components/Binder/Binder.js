import {React, useEffect, useState} from 'react'
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
import { auth, db } from '../../../backend/firebase'
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Binder = (props) => {


    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        

        const fetchData = async(userEmail) => {
            
            
            console.log(userEmail)
            const docRef = doc(db, "users", userEmail);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setItems(docSnap.data().items)
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        onAuthStateChanged(auth, (user) => {
            console.log('erytime')
              if (user) {
                setUserEmail(user.email);
                console.log("uid", user.uid)
                setUserEmail(user.email);
                fetchData(user.email);
              } else {
                console.log("user is logged out")
              }
            });
    }, [])

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
        let arr = [...items];
        if(items.length == 0) {
            if(num == 10) {
                arr.push({
                    type: 'class/project',
                    name: 'default',
                    components: [],
                    num: num,
                    open: false
                })
                console.log(arr);
                setItems(arr);
            } else if(num == 20) {
                setItems([{
                    type: 'folder',
                    name: 'default',
                    components: [],
                    num: num,
                    open: false
                }]);
            } else if (num == 30) {
                setItems([{
                    type: 'notebook',
                    name: 'default',
                    components: [],
                    num: num,
                    open: false

                }]);
            } 

            console.log(items);
            return;
    
        }
        if(items.length == 1) {
            let temp = [...items];
            if(num == 10) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'class/project',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false
                        
                    })
                } else {
                    temp.push({
                        type: 'class/project',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    })
                }
            } else if(num == 20) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'folder',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    })
                    console.log(temp);
                } else {
                    temp.push({
                        type: 'folder',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    })
                }
            } else if (num == 30) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'notebook',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    })
                } else {
                    temp.push({
                        type: 'notebook',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    })
                }
            } 

            console.log("yee yee yee " + temp);
            setItems(temp);

            return;
    
        }
        console.log("starting for")
        for(let i = 0; i < arr.length; i++) {
            if(num < arr[i].num) {
                if(num == 10) {
                    arr.splice(i, 0, {
                        type: 'class/project',
                        name: 'default',
                    num: num,
                    components: [],
                    open: false

                    });
                    setItems(arr);
                    return;
                } else if(num == 20) {
                    arr.splice(i, 0, {
                        type: 'folder',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    });
                    setItems(arr);
                    return;
                } else if (num == 30) {
                    arr.splice(i, 0, {
                        type: 'notebook',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    });
                    setItems(arr);
                    return;
                }
                
            } else if(i == arr.length - 1) {
                if(num == 10) {
                    arr.push({
                        type: 'class/project',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    });
                    setItems(arr);
                    return;
                } else if(num == 20) {
                    arr.push({
                        type: 'folder',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    });
                    setItems(arr);
                    return;
                } else if (num == 30) {
                    arr.push({
                        type: 'notebook',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false

                    });
                    setItems(arr);
                    return;
                }
            }
        }
        
        
        console.log(arr);
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
        console.log('updated')
        updateDB(items);

        
    }

    const removeItem = (name) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].name == name) {
                temp.splice(i, 1);
            }
        }
        setItems(temp);
        updateDB(temp);
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
        updateDB(items);
    }

    const setPropOpen = (name, open) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].name == name) {
                temp[i].open = open;
            }
        }
        console.log(temp);
        setItems(temp);
        updateDB(items);
    }

    const updateDB = async(items) => {
        console.log(userEmail)
        const userRef = doc(db, "users", userEmail);
        await updateDoc(userRef, {
            items: items
        })
    }

    

  return (
    <div className='bg-[#faefd2] drop-shadow-md h-[80vh] w-[300px] rounded-md flex flex-col '>
        <div className='mt-[20px] h-[50px] ml-[25px]  w-[250px] flex items-center justify-between rounded-lg'>
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
        <div className='gap-[17px] flex flex-col ml-[25px] w-[250px]'>
            {
                items.map((item) => {
                    if(item.type === 'class/project') {
                        return <ClassProject setPropOpen={setPropOpen} open={item.open} components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName}/>
                    } else if (item.type === 'folder') {
                        return <Folder setPropOpen={setPropOpen} open={item.open} components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName}/>
                    } else {
                        return <Notebook setPropOpen={setPropOpen} open={item.open} components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName}/>
                    }
                })
            }
        </div>
    </div>
  )
}

export default Binder