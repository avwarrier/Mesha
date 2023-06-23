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
 

  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    level: '',
    uid: ''
  })

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUserInfo({
            email: user.email,
            uid: user.uid,
            name: user.name,
            level: user.level
          })
          // ...
          console.log("uid", user.uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
}, [])
  

  return (
    <div className="h-[100vh] bg-[#faefd2]">
      <NavBar />
      <div className="flex h-[calc(100vh-70px)] justify-center items-center gap-[20px]">
          <Binder />
          <CentralDisplay />
          <NotesPanel />

      </div>
    </div>
  );
}

export default HomePage;
