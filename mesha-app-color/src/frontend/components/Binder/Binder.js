import {React, useEffect, useState, useRef} from 'react'
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
import Skeleton from '@mui/material/Skeleton';
import { v4 as uuid } from 'uuid';

const Binder = (props) => {


    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [docOpen, setDocOpen] = useState('');
    

    useEffect(() => {
        

        const fetchData = async(userEmail) => {
            
            
            console.log(userEmail)
            const docRef = doc(db, "users", userEmail);
            setLoading(true);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setItems(docSnap.data().items)
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            setLoading(false);
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
        const myId = uuid();
        if(items.length == 0) {
            if(num == 10) {
                arr.push({
                    type: 'class/project',
                    name: 'default',
                    components: [],
                    num: num,
                    open: false,
                    id: myId
                })
                console.log(arr);
                setItems(arr);
            } else if(num == 20) {
                setItems([{
                    type: 'folder',
                    name: 'default',
                    components: [],
                    num: num,
                    open: false,
                    id: myId
                }]);
            } else if (num == 30) {
                setItems([{
                    type: 'notebook',
                    name: 'default',
                    components: [],
                    num: num,
                    open: false,
                    id: myId

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
                    open: false,
                    id: myId
                        
                    })
                } else {
                    temp.push({
                        type: 'class/project',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

                    })
                }
            } else if(num == 20) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'folder',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

                    })
                    console.log(temp);
                } else {
                    temp.push({
                        type: 'folder',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

                    })
                }
            } else if (num == 30) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'notebook',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

                    })
                } else {
                    temp.push({
                        type: 'notebook',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

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
                    open: false,
                    id: myId

                    });
                    setItems(arr);
                    return;
                } else if(num == 20) {
                    arr.splice(i, 0, {
                        type: 'folder',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

                    });
                    setItems(arr);
                    return;
                } else if (num == 30) {
                    arr.splice(i, 0, {
                        type: 'notebook',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

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
                    open: false,
                    id: myId

                    });
                    setItems(arr);
                    return;
                } else if(num == 20) {
                    arr.push({
                        type: 'folder',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

                    });
                    setItems(arr);
                    return;
                } else if (num == 30) {
                    arr.push({
                        type: 'notebook',
                        name: 'default',
                        components: [],
                    num: num,
                    open: false,
                    id: myId

                    });
                    setItems(arr);
                    return;
                }
            }
        }
        
        
        console.log(arr);
        console.log(items);
    }

    const setName = (id, prevName, name) => {
        let temp = [...items];
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].id == id) {
                temp[i].name = name;
            }
        }
        setItems(temp);
        console.log('updated')
        updateDB(items);

        
    }

    const removeItem = (id) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].id == id) {
                childRef.current.childFunction1(id);
                temp.splice(i,1);
                break;
            }
        }
        setItems(temp);
        updateDB(temp);
    }

    const setComponents = (id, comps) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].id == id) {
                temp[i].components = comps;
            }
        }
        console.log(temp);
        setItems(temp);
        updateDB(items);
    }

    const setPropOpen = (id, open) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].id == id) {
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

    const childRef = useRef(null);

    

  return (
    <div className='bg-[#ffffff] drop-shadow-md h-[80vh] w-[300px] rounded-md flex flex-col overflow-auto pb-[20px]'>
        <div className='mt-[20px] h-[50px] ml-[25px]  w-[250px] flex items-center justify-between rounded-lg'>
            <p className='ml-[20px] text-[25px] font-thin'>Binder</p>
            <div onClick={handleClick} className='rounded-[3px] mr-[20px] h-[30px] w-[30px] flex justify-center items-center cursor-pointer  hover:bg-[#eaeaea] hover:shadow-sm'>
                <AddIcon sx={{fontWeight: 'light'}}/>

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
                      { backgroundColor: "#ffffff", borderRadius: "10px", width: "170px", paddingX: "5px"}, 
                      
                    }
                  }
            >
                <MenuItem sx={{borderRadius: "5px"}} onClick={() => addItem(10)} className='flex items-center gap-[10px] h-[30px]'>
                  <SchoolIcon sx={{color: "#4a6a8f"}}/>
                  <p className=' font-light'>Class/Project</p>
                </MenuItem>
                <MenuItem sx={{borderRadius: "5px"}} onClick={() => addItem(20)} className='flex items-center gap-[10px] h-[30px]'>
                  <CreateNewFolderIcon sx={{color: "#6a8099"}}/>
                  <p className=' font-light'>Folder</p>
                </MenuItem>
                <MenuItem sx={{borderRadius: "5px"}} onClick={() => addItem(30)} className='flex items-center gap-[10px] h-[30px]'>
                <EditNoteIcon sx={{color: "#333"}}/>
                  <p className=' font-light'>Notebook</p>
                </MenuItem>
                
            </Menu>

            
        </div>
        {
            loading ? 
                <div className=' flex flex-col ml-[25px] w-[250px]'>
                    <div className='flex items-center'>
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton sx={{marginLeft: "10px"}} variant="rounded" width={200} height="27px" />
                    </div>
                    
                        <Skeleton sx={{marginLeft: "0px", marginTop: "5px"}} variant="rounded" width={200} height="22px" />
                        <Skeleton sx={{marginTop: "8px", marginLeft: "20px" }} variant="rounded" width="210px" height="20px" />
                        <Skeleton sx={{marginTop: "5px", marginLeft: "40px" }} variant="rounded" width="190px" height="20px" />
                        <Skeleton sx={{marginTop: "5px", marginLeft: "20px" }} variant="rounded" width="210px" height="20px" />

                        <div className='flex items-center mt-[25px]'>
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton sx={{marginLeft: "10px"}} variant="rounded" width={200} height="27px" />
                    </div>
                    
                        <Skeleton sx={{marginLeft: "0px", marginTop: "5px"}} variant="rounded" width={200} height="22px" />
                        <Skeleton sx={{marginTop: "5px", marginLeft: "20px" }} variant="rounded" width="210px" height="20px" />
                </div>
            :
            <div className='gap-[17px] flex flex-col ml-[25px] w-[250px]'>
            {
                items.map((item) => {
                    if(item.type === 'class/project') {
                        return <ClassProject ref={childRef} id={item.id} dues={props.dues} updateDues={props.updateDues} chan={props.chan} docOpen={docOpen} setDocOpen={setDocOpen} userEmail={userEmail} setPropOpen={setPropOpen} open={item.open} components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName} setCentralInfo={props.setCentralInfo}/>
                    } else if (item.type === 'folder') {
                        return <Folder ref={childRef} id={item.id} dues={props.dues} updateDues={props.updateDues} chan={props.chan} docOpen={docOpen} setDocOpen={setDocOpen} userEmail={userEmail} setPropOpen={setPropOpen} open={item.open} components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName} setCentralInfo={props.setCentralInfo}/>
                    } else {
                        return <Notebook ref={childRef} id={item.id} dues={props.dues} updateDues={props.updateDues} chan={props.chan} docOpen={docOpen} setDocOpen={setDocOpen} userEmail={userEmail} setPropOpen={setPropOpen} open={item.open} components={item.components} setComponents={setComponents} removeItem={removeItem} name={item.name} setName={setName} setCentralInfo={props.setCentralInfo}/>
                    }
                })
            }
        </div>
        }
    </div>
  )
}

export default Binder