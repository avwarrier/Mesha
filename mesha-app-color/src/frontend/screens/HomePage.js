import NavBar from "../components/Nav/NavBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../backend/firebase';
import {useState, useEffect} from 'react'
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Binder from "../components/Binder/Binder";
import CentralDisplay from "../components/CentralDisplay/CentralDisplay";
import NotesPanel from "../components/NotesPanel/NotesPanel";

function HomePage() {

  const navigate = useNavigate();
  const [centralInfo, setC] = useState({
    id: 'yee',
    name: ''
  });

  

  useEffect(() => {
    
  }, [])

  const setCentralInfo = (id, name) => {
    setC({
      name: name,
      id: id
    })
  }

  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    level: '',
    uid: '',
    items: []
  })

  const [userEmail, setUserEmail] = useState('');

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      console.log('erytime')
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUserInfo({
            email: user.email,
            uid: user.uid,
            name: user.displayName,
            level: user.level,
            items: user.items
          })
          setUserEmail(user.email);
          // ...
          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("letter", user.displayName);
          const saved = localStorage.getItem("name");
          const otherSaved = localStorage.getItem("id");
          console.log(otherSaved, "   ", saved);
          setC({
            id: otherSaved.substring(1, otherSaved.length-1),
            name: saved.substring(1, saved.length-1)
          })
          console.log("uid", user.uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
      
      
     
}, [])

const [chan, setChan] = useState({});
const [dues, updateDues] = useState(false);
const [dueChange, setDueChange] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

  /*{
            menuOpen &&
            <div className='absolute bg-red-500 w-[180px] h-[100px] z-50 ml-[calc(100vw-200px)] '></div>
      }*/

  return (
    <div className="h-[100vh] bg-[#ffffff]">
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} userEmail={userEmail}/>
      
      <div className="flex h-[calc(100vh-70px)] justify-center items-center gap-[20px]">
          <Binder updateDues={updateDues} dues={dues} chan={chan} setCentralInfo={setCentralInfo}/>
          <CentralDisplay dueChange={dueChange} dues={dues} updateDues={updateDues} setChan={setChan} centralInfo={centralInfo} userEmail={userEmail} setC={setC}/>
          <NotesPanel dueChange={dueChange} setDueChange={setDueChange} updateDues={updateDues} userEmail={userEmail} dues={dues}/>

      </div>
      
    </div>
  );
}

export default HomePage;
