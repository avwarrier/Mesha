import React, { useEffect, useState, useRef } from 'react'
import { auth, db } from '../../../../backend/firebase'
import { collection, doc, setDoc, getDocs, collectionGroup, updateDoc, deleteDoc } from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

const Description = (props) => {

    const [edit, setEdit] = useState(false);
    const [notes, setNotes] = useState('');
    const ref = useRef(null);
    const divref = useRef(null);
    const { onClickOutside } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside && onClickOutside();
              let saved = localStorage.getItem("notes");
              saved = saved.substring(1, saved.length-1);
              callCheck(saved);
              //localStorage.setItem("notes", JSON.stringify(e.target.value));
            
        }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClickOutside ]);

    

    const callCheck = async (saved) => {
      console.log(saved)
      const userRef = doc(db, "users", props.userEmail, "openItems", props.id);
      await updateDoc(userRef, {
          description: saved,
      });
      
    }

    

   useEffect(() => {
      console.log(props.notes)
      setNotes(props.notes);
      
    }, [props.notes])

    const handleKeyDown = event => {
  
      if (event.key === 'Enter') {
          
        callCheck();
        setEdit(false);
      }
  };

  const handleFocus = (e) => {
    const target = e.target;
    
    target.selectionStart = notes.length;
    target.selectionEnd = notes.length;
  }


  return (
      <div ref={divref} className=' w-[400px] h-[27vh] mt-[47vh] absolute'>
        <textarea ref={ref} value={notes} onChange={(e) => {
            setNotes(e.target.value);
            localStorage.setItem("notes", JSON.stringify(e.target.value));
        }}  placeholder='Notes' className='h-[100%] w-[100%] p-[10px] resize-none outline-none bg-[#eaeaea] placeholder:text-[#6d6b69] placeholder:font-light rounded-md border-b-[2px] border-[#4a6a8f] whitespace-pre-line'/>
      </div>
      
      
  )
}

export default Description