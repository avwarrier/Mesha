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
            name: user.name,
            level: user.level,
            items: user.items
          })
          setUserEmail(user.email);
          // ...
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

  

  return (
    <div className="h-[100vh] bg-[#ffffff]">
      <NavBar />
      <div className="flex h-[calc(100vh-70px)] justify-center items-center gap-[20px]">
          <Binder setCentralInfo={setCentralInfo}/>
          <CentralDisplay centralInfo={centralInfo} userEmail={userEmail} setC={setC}/>
          <NotesPanel />

      </div>
    </div>
  );
}

export default HomePage;
