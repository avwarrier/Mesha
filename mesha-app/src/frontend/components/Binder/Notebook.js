import {React, useState, useEffect} from 'react'
import NotebookItem from './BinderProps/NotebookItem'
import Note from './BinderProps/DocItems/Note';

const Notebook = (props) => {

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

    const setPropOpen = (name, open) => {
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


    const removeItem = (name) => {
        let temp = [...items];
        for(let i = 0; i < items.length; i++) {
            if(temp[i].name == name) {
                temp.splice(i, 1);
            }
        }
        setItems(temp);
        props.setComponents(props.name, temp);
    }

  return (
    <div className='flex flex-col'>
        <NotebookItem open={props.open} setOpen={props.setPropOpen} addItem={addItem} removeItem={props.removeItem} setName={props.setName} name={props.name}/>
        {props.open && 
            <div className={items.length > 0 ? 'ml-[20px] my-[5px]' : "ml-[20px]"}>
                {
                    items.map((item) => {
                        return <Note setPropOpen={setPropOpen} open={item.open} removeItem={removeItem} setName={setName} name={item.name}/>
                    })
                }
            </div>  
        }
    </div>
  )
}

export default Notebook