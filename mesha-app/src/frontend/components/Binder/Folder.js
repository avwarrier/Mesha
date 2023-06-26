import {React, useEffect, useState} from 'react'
import FolderItem from './BinderProps/FolderItem'
import Notebook from './Notebook';
import Note from './BinderProps/DocItems/Note';
import Document from './BinderProps/DocItems/Document';
import Link from './BinderProps/DocItems/Link';

const Folder = (props) => {

    
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.components);
    }, [])

    const addItem = (num) => {
        if(num == 40) {
            setItems(oldItems => [...oldItems, {
                type: 'document',
                name: 'default',
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
        console.log(temp);
        props.setComponents(props.name, items);
    }


    const removeItem = (name) => {
        setItems(items.filter(item => item.name !== name));
    }

  return (
    <div className='flex flex-col'>
        <FolderItem open={open} setOpen={setOpen} addItem={addItem} removeItem={props.removeItem} name={props.name} setName={props.setName}/>
        {open && 
            <div className={items.length > 0 ? 'ml-[20px] my-[0px]' : "ml-[20px]"}>
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

export default Folder