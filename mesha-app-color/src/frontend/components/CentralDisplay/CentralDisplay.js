import {React, useState, useEffect, useRef} from 'react'
import Tag from './pieces/Tag'
import AssociatedLinks from './pieces/AssociatedLinks';
import Description from './pieces/Description';
import Comments from './pieces/Comments';
import "quill/dist/quill.snow.css"
import Quill from "quill"
import { auth, db } from '../../../backend/firebase'
import { collection, doc, setDoc, getDocs, collectionGroup, getDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NotificationsPausedOutlinedIcon from '@mui/icons-material/NotificationsPausedOutlined';

const CentralDisplay = (props) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [links, setLinks] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const checkOpen = async () => {
      if(props.centralInfo.id == 'yee') {
        setType('blank');
      } else {
        console.log(props.centralInfo.id, "  ", props.userEmail)
        const docRef = doc(db, "users", props.userEmail, "openItems", props.centralInfo.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
  
          setType(docSnap.data().type);
          setName(props.centralInfo.name);
          setNotes(docSnap.data().description);
          setDate(docSnap.data().date);
          setTime(docSnap.data().time);
          setLinks(docSnap.data().links);
          setComments(docSnap.data().comments);
          localStorage.setItem("id", JSON.stringify(props.centralInfo.id));
          localStorage.setItem("name", JSON.stringify(props.centralInfo.name));
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      
      
  }
  
  checkOpen();
  }, [props.centralInfo])

  const handleEnter = (event) => {
    if (event.key === 'Enter') {

      setName(name);
  }
  }

  

  const TOOLBAR_OPTIONS = [
    [{ header: [false, 6, 5, 4, 3, 2, 1 ] }],
    [{ font: [] }],
    [{ list: "ordered" }, {list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, {background: [] }],
    ["image", "blockquote", "code-block"],
  ]

  useEffect(() => {
    new Quill("#container", { theme: "snow", modules: {toolbar: TOOLBAR_OPTIONS } })
  }, [])


  return (
    type == 'note' ?
        <div className='bg-[#ffffff] drop-shadow-md h-[80vh] w-[680px] rounded-md flex-col flex'>
            <input onKeyDown={handleEnter} value={name} onChange={(e) => {
              
              setName(e.target.value)
            }} className='h-[40px] bg-[#ffffff] border-[#b8b8b8] border-[1px] w-[300px] outline-none rounded-md  px-[15px] text-[23px] mt-[10px] mb-[10px] ml-[22.75px] font-light' />
            <div className='w-[93%] h-[60vh] ml-[22.75px]'>
              <div id='container' className='resize-none outline-none bg-[#ffffff]   rounded-b-md  ' />
            </div>
      </div>
    :
      type == 'blank' ?
        <div className='bg-[#ffffff] drop-shadow-md h-[80vh] w-[680px] rounded-md flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center'>
            <NotificationsPausedOutlinedIcon sx={{color: "#777", fontSize: "40px"}}/>
            <p className='text-[25px] font-light text-[#888]'>no items selected...</p>
          </div>
      </div> 
      :
        <div className='bg-[#ffffff] drop-shadow-md h-[80vh] w-[680px] rounded-md flex'>
          <div className='h-[100%] w-[70%] flex flex-col items-center py-[20px]'>
            <div className='flex  w-[90%] h-[100px] items-center justify-center gap-[120px]'>
              <Tag type={type} name={name}/>
              <div className='flex flex-col mt-[10px]'>
              <p className='text-[16px]'>{date}</p>
              <p className='text-[13px]'>{time}</p>
              </div>
            </div>

            <AssociatedLinks links={links} setLinks={setLinks}/>
            <Description notes={notes} setNotes={setNotes} userEmail={props.userEmail} id={props.centralInfo.id}/>
          </div>
          <div className=' w-[30%] h-[100%] flex items-center justify-center mr-[10px]'>
            <Comments comments={comments} setComments={setComments}/>
          </div>
      </div>
  )
}

export default CentralDisplay