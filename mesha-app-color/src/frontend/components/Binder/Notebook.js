import {React, useState, useEffect} from 'react'
import NotebookItem from './BinderProps/NotebookItem'
import Note from './BinderProps/DocItems/Note';
import { v4 as uuid } from 'uuid';
import { auth, db } from '../../../backend/firebase'
import { collection, doc, setDoc, getDocs, collectionGroup, updateDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Notebook = (props) => {

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

    useEffect(() => {
        
        let temp = [...items];
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].id == props.chan.id) {
                temp[i].name = props.chan.name
            }
        }

        setItems(temp);
        props.setComponents(props.name, temp);
    }, [props.chan])

    useEffect(() => {
        let saved = localStorage.getItem("structId");
        if(saved != null) {
            saved = saved.substring(1, saved.length-1)
        }
        let temp = props.components;
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].num >= 40) {
                if(temp[i].id != props.docOpen) {
                    if(temp[i].id != saved) {
                        temp[i].open = false;
                    }
                }
            }
        }
        setItems(temp);
        props.setComponents(props.name, temp);
    }, [props.docOpen])

    const addItem = (num) => {
        const myId = uuid();
        setItems(oldItems => [...oldItems, {
            type: 'note',
            name: 'default',
            num: 60,
            open: false,
            id: myId
        }]);


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
                    if(prevName == 'default') {
                        updateDB(temp[i].id, temp[i]);
                        props.setCentralInfo(temp[i].id, temp[i].name);
                        localStorage.setItem("structId", JSON.stringify(temp[i].id));
                        props.setDocOpen(temp[i].id);
                    } else {
                        changeName(temp[i].name, temp[i].id);
                        props.setCentralInfo(temp[i].id, temp[i].name);
                        localStorage.setItem("structId", JSON.stringify(temp[i].id));
                        props.setDocOpen(temp[i].id);
                        switchOpen(temp[i].id);
                    }
                    
            }
        }
        setItems(temp);
        props.setComponents(props.name, items);
    }

    const setPropOpen = (id, open) => {
        let temp = [...items];
        for(let j = 0; j < items.length; j++) {

                if(temp[j].id == id && temp[j].open == true) {
                    return;
                }
                if(temp[j].open == true) {
                    temp[j].open = false;
                }
        }
        for(let i = 0; i < items.length; i++) {
            if(temp[i].id == id) {
                temp[i].open = open;
                changeOpen(temp[i].id)
                props.setCentralInfo(id, temp[i].name);
                localStorage.setItem("structId", JSON.stringify(id));
                props.setDocOpen(id);
            }
        }
        console.log(temp);
        setItems(temp);
        props.setComponents(props.name, items);
    }




    const delDoc = async (id) => {
        await deleteDoc(doc(db, "users", props.userEmail, "openItems", id));
    }


    const removeSubItem = (id) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].id == id) {
                props.setCentralInfo('yee', 'yee');
                props.setDocOpen('none');
                temp.splice(i, 1);
                localStorage.setItem("descriptC", "blank");
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
        <NotebookItem open={props.open} setOpen={props.setPropOpen} addItem={addItem} removeItem={props.removeItem} setName={props.setName} name={props.name}/>
        {props.open && 
            <div className={items.length > 0 ? 'ml-[20px] my-[5px]' : "ml-[20px]"}>
                {
                    items.map((item) => {
                        return <Note id={item.id} setPropOpen={setPropOpen} open={item.open} removeItem={removeSubItem} setName={setName} name={item.name}/>
                    })
                }
            </div>  
        }
    </div>
  )
}

export default Notebook