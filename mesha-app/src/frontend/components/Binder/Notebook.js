import {React, useState, useEffect} from 'react'
import NotebookItem from './BinderProps/NotebookItem'
import Note from './BinderProps/DocItems/Note';

const Notebook = (props) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(props.components);
    }, [])

    const addItem = (num) => {
        setItems(oldItems => [...oldItems, {
            type: 'note',
            name: 'default'
        }]);


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
        console.log(temp);
        props.setComponents(props.name, items);
    }


    const removeItem = (name) => {
        setItems(items.filter(item => item.name !== name));
    }

  return (
    <div className='flex flex-col'>
        <NotebookItem open={open} setOpen={setOpen} addItem={addItem} removeItem={props.removeItem} setName={props.setName} name={props.name}/>
        {open && 
            <div className={items.length > 0 ? 'ml-[20px] my-[5px]' : "ml-[20px]"}>
                {
                    items.map((item) => {
                        return <Note removeItem={removeItem} setName={setName} name={item.name}/>
                    })
                }
            </div>  
        }
    </div>
  )
}

export default Notebook