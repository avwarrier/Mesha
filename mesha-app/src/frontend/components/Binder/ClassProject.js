import {React, useState, useEffect} from 'react'
import ClassProjectItem from './BinderProps/ClassProjectItem'
import Folder from './Folder';
import Notebook from './Notebook';
import Note from './BinderProps/DocItems/Note';
import Document from './BinderProps/DocItems/Document';
import Link from './BinderProps/DocItems/Link';
import { signInWithEmailAndPassword } from 'firebase/auth';


const ClassProject = (props) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    

    /*const addItem = (num) => {
        let arr = [...items];
        if(items.length == 0) {
            if(num == 40) {
                arr.push({
                    type: 'document',
                    name: 'default',
                    num: num
                })
                console.log(arr);
                setItems(arr);
            } else if(num == 20) {
                setItems([{
                    type: 'folder',
                    name: 'default',
                    num: num
                }]);
            } else if (num == 30) {
                setItems([{
                    type: 'notebook',
                    name: 'default',
                    num: num
                }]);
            } else if (num == 50) {
                setItems([{
                    type: 'link',
                    name: 'default',
                    num: num
                }]);
            } else {
                setItems([{
                    type: 'note',
                    name: 'default',
                    num: num
                }]);
            }

            console.log(items);
            return;
    
        }
        if(items.length == 1) {
            let temp = [...items];
            if(num == 40) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'document',
                        name: 'default',
                        num: num
                    })
                } else {
                    temp.push({
                        type: 'document',
                        name: 'default',
                        num: num
                    })
                }
            } else if(num == 20) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'folder',
                        name: 'default',
                        num: num
                    })
                    console.log(temp);
                } else {
                    temp.push({
                        type: 'folder',
                        name: 'default',
                        num: num
                    })
                }
            } else if (num == 30) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'notebook',
                        name: 'default',
                        num: num
                    })
                } else {
                    temp.push({
                        type: 'notebook',
                        name: 'default',
                        num: num
                    })
                }
            } else if (num == 50) {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'link',
                        name: 'default',
                        num: num
                    })
                } else {
                    temp.push({
                        type: 'link',
                        name: 'default',
                        num: num
                    })
                }
            } else {
                if(num < items[0].num) {
                    temp.unshift({
                        type: 'note',
                        name: 'default',
                        num: num
                    })
                } else {
                    temp.push({
                        type: 'note',
                        name: 'default',
                        num: num
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
                if(num == 40) {
                    arr.splice(i, 0, {
                        type: 'document',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                } else if(num == 20) {
                    arr.splice(i, 0, {
                        type: 'folder',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                } else if (num == 30) {
                    arr.splice(i, 0, {
                        type: 'notebook',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                } else if (num == 50) {
                    arr.splice(i, 0, {
                        type: 'link',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                } else {
                    arr.splice(i, 0, {
                        type: 'note',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                }
                
            } else if(i == arr.length - 1) {
                if(num == 40) {
                    arr.push({
                        type: 'document',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                } else if(num == 20) {
                    arr.push({
                        type: 'folder',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                } else if (num == 30) {
                    arr.push({
                        type: 'notebook',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                } else if (num == 50) {
                    arr.push({
                        type: 'link',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                } else {
                    arr.push({
                        type: 'note',
                        name: 'default',
                        num: num
                    });
                    setItems(arr);
                    return;
                }
            }
        }
        
        
        console.log(arr);
        console.log(items);
    }

    const addName = (num, name) => {
        if(items.length == 1) {
            let temp = [...items];
            temp[0].name = name;
            setItems(temp);
            return;
        }
        if(items.length == 2) {
            let temp = [...items];
            if(temp[0].name == 'default') {
                temp[0].name = name;
            } else {
                temp[1].name = name;
            }
        }
        let temp = [...items];
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].num > num) {
                temp[i-1].name = name;
                setItems(temp);
                return;
            } else if (i == temp.length-1) {
                temp[i].name = name;
                setItems(temp);
            }
        }
        console.log(items);
        console.log(name);
    } */

    useEffect(() => {
        setItems(props.components);
    }, [])

    const addItem = (num) => {
        if(num == 40) {
            setItems(oldItems => [...oldItems, {
                type: 'document',
                name: 'default'
            }]);
        } else if(num == 20) {
            setItems(oldItems => [...oldItems, {
                type: 'folder',
                name: 'default',
                components: []
            }]);
        } else if (num == 30) {
            setItems(oldItems => [...oldItems, {
                type: 'notebook',
                name: 'default',
                components: []
            }]);
        } else if (num == 50) {
            setItems(oldItems => [...oldItems, {
                type: 'link',
                name: 'default'
            }]);
        } else {
            setItems(oldItems => [...oldItems, {
                type: 'note',
                name: 'default'
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


    const removeItem = (name) => {
        setItems(items.filter(item => item.name !== name));
    }

  return (
    <div className={!open ? 'bg-[#ece1c1] rounded-sm ' : 'bg-[#ece1c1] rounded-sm  flex flex-col'}>
        <ClassProjectItem open={open} setOpen={setOpen} addItem={addItem} removeItem={props.removeItem} setName={props.setName} name={props.name}/>
        {open && 
            <div className={items.length > 0 ? 'ml-[20px] mt-[5px] mb-[10px]' : 'ml-[20px] '}>
                {
                    items.map((item) => {
                        if (item.type === 'folder') {
                            return <Folder components={item.components} setComponents={setComponents} removeItem={removeItem} setName={setName} name={item.name}/>
                        } else if (item.type === 'notebook') {
                            return <Notebook components={item.components} setComponents={setComponents} removeItem={removeItem} setName={setName} name={item.name}/>
                        } else if (item.type === 'document') {
                            return <Document removeItem={removeItem} setName={setName} name={item.name}/>
                        } else if (item.type === 'link') {
                            return <Link removeItem={removeItem} setName={setName} name={item.name}/>
                        } else {
                            return <Note removeItem={removeItem} setName={setName} name={item.name}/>
                        }
                    })
                }
            </div>  
        }
    </div>
  )
}

export default ClassProject