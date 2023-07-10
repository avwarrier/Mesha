import React, { useEffect, useState, useRef } from 'react'
import { auth, db } from '../../../../backend/firebase'
import { collection, doc, setDoc, getDocs, collectionGroup, updateDoc, deleteDoc } from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';

const Description = (props) => {

    const [edit, setEdit] = useState(false);
    const [notes, setNotes] = useState('');
    const ref = useRef(null);
    const divref = useRef(null);
    const { onClickOutside } = props;

    

    const callCheck = async () => {
      console.log(notes)
      const userRef = doc(db, "users", props.userEmail, "openItems", props.id);
      await updateDoc(userRef, {
          description: notes,
      });
      
    }

    useEffect(() => {
      console.log(edit)
          if (ref.current) {
          ref.current.focus();
          
      }
  }, [edit]);

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


  return (
    edit ? 
      <div ref={divref} className=' w-[400px] h-[27vh] mt-[47vh] absolute'>
        <textarea ref={ref} value={notes} onChange={(e) => {
            setNotes(e.target.value);
        }} onKeyDown={handleKeyDown} placeholder='Notes' className='h-[100%] w-[100%] p-[10px] resize-none outline-none bg-[#eaeaea] placeholder:text-[#6d6b69] placeholder:font-light rounded-md border-b-[2px] border-[#4a6a8f]'/>

      </div>
    :
      <div ref={ref} className=' w-[400px] h-[27vh] mt-[47vh] absolute'>
        <div onClick={() => setEdit(true)} className='absolute mt-[5px] ml-[370px] cursor-pointer'>
        <EditIcon sx={{fontSize: "18px"}}/>
        </div>
        <div className='h-[100%] w-[100%] p-[10px] resize-none outline-none bg-[#eaeaea] rounded-md border-b-[2px] border-[#4a6a8f]'>
          {notes}
        </div>

      </div>
  )
}

export default Description