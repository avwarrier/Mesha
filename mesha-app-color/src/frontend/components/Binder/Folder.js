import {React, useEffect, useState} from 'react'
import FolderItem from './BinderProps/FolderItem'
import Notebook from './Notebook';
import Note from './BinderProps/DocItems/Note';
import Document from './BinderProps/DocItems/Document';
import Link from './BinderProps/DocItems/Link';
import { v4 as uuid } from 'uuid';
import { auth, db } from '../../../backend/firebase'
import { collection, doc, setDoc, getDocs, collectionGroup, updateDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Folder = (props) => {

    
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.components);
        const checkOpen = async () => {
            const colRef = collection(db, "users", props.userEmail, "openItems");
            const docsSnap = await getDocs(colRef);
            let temp = props.components;
            docsSnap.forEach(doc => {
                console.log(doc.data());
                //doc.data().open
                
                if(temp.indexOf(doc.data().id) != -1) {
                    
                    temp[temp.indexOf(doc.data().id)].open = doc.data().open;
                }
            })
            setItems(temp);
        }
        
        //checkOpen();
    }, [props.components])
    

    const addItem = (num) => {
        let arr = [...items];
        if(items.length == 0) {
            const myId = uuid();
            if(num == 40) {
                arr.push({
                    type: 'document',
                    name: 'default',
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
            } else if (num == 50) {
                const myId = uuid();
                setItems([{
                    type: 'link',
                    name: 'default',
                    num: num,
                    open: false,
                    id: myId
                }]);
            } else {
                const myId = uuid();
                setItems([{
                    type: 'note',
                    name: 'default',
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
            if(num == 40) {
                const myId = uuid();
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'document',
                        name: 'default',
                    num: num,
                    open: false,
                    id: myId
                        
                    })
                } else {
                    temp.push({
                        type: 'document',
                        name: 'default',
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
            } else if (num == 50) {
                const myId = uuid();
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'link',
                        name: 'default',
                    num: num,
                    open: false,
                    id: myId

                    })
                } else {
                    temp.push({
                        type: 'link',
                        name: 'default',
                    num: num,
                    open: false,
                    id: myId

                    })
                }
            } else {
                const myId = uuid();
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'note',
                        name: 'default',
                    num: num,
                    open: false,
                    id: myId

                    })
                } else {
                    temp.push({
                        type: 'note',
                        name: 'default',
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
                const myId = uuid();
                if(num == 40) {
                    arr.splice(i, 0, {
                        type: 'document',
                        name: 'default',
                    num: num,
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
                } else if (num == 50) {
                    arr.splice(i, 0, {
                        type: 'link',
                        name: 'default',
                    num: num,
                    open: false,
                    id: myId

                    });
                    setItems(arr);
                    return;
                } else {
                    arr.splice(i, 0, {
                        type: 'note',
                        name: 'default',
                    num: num,
                    open: false,
                    id: myId

                    });
                    setItems(arr);
                    return;
                }
                
            } else if(i == arr.length - 1) {
                const myId = uuid();
                if(num == 40) {
                    arr.push({
                        type: 'document',
                        name: 'default',
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
                } else if (num == 50) {
                    arr.push({
                        type: 'link',
                        name: 'default',
                    num: num,
                    open: false,
                    id: myId

                    });
                    setItems(arr);
                    return;
                } else {
                    arr.push({
                        type: 'note',
                        name: 'default',
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

    

    const updateDB = async(id, object) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
            let today = new Date();
            let date = monthNames[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear()
            let hour = today.getHours();
            let am = 'am';
            if(hour > 12) {
                am = 'pm';
                hour -= 12;
            } else if (hour == 0) {
                hour = 12;
            }
            let minute = '';
            if(today.getMinutes() < 10) {
                minute = '0' + today.getMinutes();
            } else {
                minute = today.getMinutes();
            }
            let time = hour + ":" + minute + "" + am;
        const userRef = doc(db, "users", props.userEmail, "openItems", id);
        await setDoc(userRef, {
            name: object.name,
            date: date,
            time: time,
            links: [],
            comments: [],
            description: '',
            type: object.type,
            open: true,
            id: id,
            dueDate: null
          });
          switchOpen(id);
    }

    const switchOpen = async (id) => {
        const colRef = collection(db, "users", props.userEmail, "openItems");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach(async dox => {
                if(id != dox.data().id) {
                    const userRef = doc(db, "users", props.userEmail, "openItems", dox.data().id);
                    await updateDoc(userRef, {
                        open: false,
                    });
                }
            })
            props.setComponents(props.name, items);
    }

    
    const changeName = async (paramName, id) => {
        const userRef = doc(db, "users", props.userEmail, "openItems", id);
        await updateDoc(userRef, {
            name: paramName,
          });
    }

    const changeOpen = async (id) => {
        const userRef = doc(db, "users", props.userEmail, "openItems", id);
        await updateDoc(userRef, {
            open: true,
          });
          switchOpen(id);
    }

    const setName = (prevName, name) => {
        let temp = [...items];
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].name == prevName) {
                temp[i].name = name;
                if(temp[i].num >= 40) {
                    if(prevName == 'default') {
                        updateDB(temp[i].id, temp[i]);
                        props.setCentralInfo(temp[i].id, temp[i].name)
                    } else {
                        changeName(temp[i].name, temp[i].id);
                        props.setCentralInfo(temp[i].id, temp[i].name);
                        switchOpen(temp[i].id);
                    }
                    
                }
            }
        }
        setItems(temp);
        props.setComponents(props.name, items);
    }

    const setComponents = (name, comps) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].name == name) {
                temp[i].components = comps;
            }
        }
        setItems(temp);
        props.setComponents(props.name, items);
    }

    const setOgOpen = (name, open) => {
        let temp = [...items];
        
        for(let i = 0; i < items.length; i++) {
            if(temp[i].name == name) {
                temp[i].open = open;
            }
        }
        console.log(temp);
        setItems(temp);
        props.setComponents(props.name, items);
    }

    const setPropOpen = (id, open) => {
        let temp = [...items];
        for(let j = 0; j < items.length; j++) {
            if(temp[j].type == 'document' || temp[j].type == 'link' || temp[j].type == 'note') {
                if(temp[j].id == id && temp[j].open == true) {
                    return;
                }
                if(temp[j].open == true) {
                    temp[j].open = false;
                }
            }
        }
        for(let i = 0; i < items.length; i++) {
            if(temp[i].id == id) {
                temp[i].open = open;
                changeOpen(temp[i].id)
                props.setCentralInfo(id, temp[i].name);
            }
        }
        console.log(temp);
        setItems(temp);
        props.setComponents(props.name, items);
    }


    const removeItem = (name) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].name == name) {
                temp.splice(i, 1);
                break;
            }
        }
        setItems(temp);
        console.log(temp);
        props.setComponents(props.name, temp);
    }

    const delDoc = async (id) => {
        await deleteDoc(doc(db, "users", props.userEmail, "openItems", id));
    }

    const removeSubItem = (id) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].id == id) {
                temp.splice(i, 1);
                delDoc(id);
                break;
            }
        }
        setItems(temp);
        console.log(temp);
        props.setComponents(props.name, temp);
    }

  return (
    <div className='flex flex-col'>
        <FolderItem open={props.open} setOpen={props.setPropOpen} addItem={addItem} removeItem={props.removeItem} name={props.name} setName={props.setName}/>
        {props.open && 
            <div className={items.length > 0 ? 'ml-[20px] my-[0px]' : "ml-[20px]"}>
                {
                    items.map((item) => {
                        if (item.type === 'folder') {
                            return <Folder userEmail={props.userEmail} setPropOpen={setOgOpen} open={item.open} components={item.components} setComponents={setComponents} removeItem={removeItem} setName={setName} name={item.name} setCentralInfo={props.setCentralInfo}/>
                        } else if (item.type === 'notebook') {
                            return <Notebook userEmail={props.userEmail} setPropOpen={setOgOpen} open={item.open} components={item.components} setComponents={setComponents} removeItem={removeItem} setName={setName} name={item.name} setCentralInfo={props.setCentralInfo}/>
                        } else if (item.type === 'document') {
                            return <Document setPropOpen={setPropOpen} open={item.open} removeItem={removeSubItem} id={item.id} setName={setName} name={item.name}/>
                        } else if (item.type === 'link') {
                            return <Link setPropOpen={setPropOpen} open={item.open} removeItem={removeSubItem} id={item.id} setName={setName} name={item.name}/>
                        } else {
                            return <Note setPropOpen={setPropOpen} open={item.open} removeItem={removeSubItem} id={item.id} setName={setName} name={item.name}/>
                        }
                    })
                }
            </div>  
        }
    </div>
  )
}

export default Folder