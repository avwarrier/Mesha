import {React} from 'react'
import logoplaceholderimage from '../../assets/logo-placeholder-image.png'
import profilePlaceHolder from '../../assets/profile-placeholder.png'
import { auth, db } from '../../../backend/firebase'
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from 'react'
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NavBar = (props) => {
  const navigate = useNavigate();
 
  const handleLogout = () => {               
      signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
      // An error happened.
      });
  }

  const [letter, setLetter] = useState('');

  useEffect(()=>{
    if(props.userEmail == '' || props.userEmail == null) {
        return;
    };
    const doSumn = async() => {
        const docRef = doc(db, "users", props.userEmail);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setLetter(docSnap.data().name.substring(0,1))
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
    }

    doSumn();
}, [props.userEmail])

const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



  return (
    <div className='h-[70px] drop-shadow-md bg-[#ffffff] flex items-center justify-between'>
        <div className='flex gap-[15px] items-center ml-[30px]'>
            <img alt='logo' className='h-[10.5vh]' src={logoplaceholderimage}/>
            <p className='text-[25px]'>Mesha</p>
        </div>
        <div className='mr-[30px]'>
            <Avatar onClick={handleClick} sx={{bgcolor: "#378727", cursor: 'pointer', '&:hover': { bgcolor: "#2c701e" },}}>{letter}</Avatar>
            <Menu
            elevation={3}
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={
                    { "& .MuiMenu-paper": 
                      { backgroundColor: "#49494a", width: "140px", display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: "5px", borderRadius: "10px", marginTop: "5px"}, 
                    }
                  }
            >
                <MenuItem sx={{borderRadius: "5px", "&:hover": {backgroundColor: "#3d3d3d !important"}}}  className='flex items-center rounded-md h-[30px] gap-[10px] justify-end'>
                  <p className='text-white '>canvas</p>
                  <img src='https://canvas.wfu.edu/app/uploads/sites/12/2019/09/canvas-logo-1024x1020.png' className='h-[21px]'/>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{borderRadius: "5px", "&:hover": {backgroundColor: "#3d3d3d !important"}}} className='flex items-center gap-[15px] h-[30px]'>
                  
                  <p className=' text-white'  >logout</p>
                  <ExitToAppIcon sx={{color: "#ffffff"}}/>
                </MenuItem>
                
            </Menu>
            
        </div>
        
    </div>
  )
}

export default NavBar