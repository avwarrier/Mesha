import {React, useState} from 'react'
import NavBarLogin from '../components/NavBarLogin'
import {motion as m } from "framer-motion"
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../../backend/firebase'
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [invalidInfoEmail, setInvalidInfoEmail] = useState(false);
    const [shortPass, setShortPass] = useState(false);

    const googleAuthSignUp = async() => {
        await signInWithGoogle();
        navigate('/completeprofile');
    }

    const signUp = async() => {
        if(email === '') {
            setInvalidInfoEmail(true);
            setEmail('');
            if(password.length < 8) {
                setShortPass(true);
                setPassword('');
                return;
            }
            return;
        }
        if(password.length < 8) {
            setShortPass(true);
            setPassword('');
            return;
        }

        setShortPass(false);
        setInvalidInfoEmail(false);

        registerWithEmailAndPassword("", email, password, navigate)
    }


    return (
        
        <div className='h-[100vh] bg-[#faefd2] '>
            <NavBarLogin started={true}/>
            <m.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}className='h-[350px] w-[400px] drop-shadow-md rounded-md bg-[#faefd2] mt-[15vh] m-auto flex flex-col items-center justify-center gap-[10px]'>
                <div className='flex items-center justify-between bg-white h-[50px] w-[300px] shadow-md rounded-xl cursor-pointer transition eas-in-out delay-90 hover:shadow-sm' onClick={googleAuthSignUp}>
                    <img alt='google' className='ml-[20px] h-[25px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png'/>
                    <p className='mr-[70px] font-light'>Sign-Up With Google</p>
                </div>
                <p className='text-[#4a6a8f]'>_________________________</p>
                <div className='h-[180px] w-[300px] flex flex-col items-center justify-center gap-[20px] mt-[15px]'>
                    <input value={email} onChange={(e) => {
                        if(invalidInfoEmail) setInvalidInfoEmail(false);
                        setEmail(e.target.value)
                    }} placeholder='email' className={!invalidInfoEmail ? 'outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-[#4a6a8f] h-[45px] w-[300px] p-[20px] rounded-xl' : 'outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-red-700 h-[45px] w-[300px] p-[20px] rounded-xl border-red-400 border-2'}/>
                    
                    <input value={password} onChange={(e) => {
                        if(shortPass) setShortPass(false);
                        setPassword(e.target.value)
                    }} placeholder={!shortPass ? 'password (8 characters)' : 'must be 8 or more characters'} type="password" className={!shortPass ? 'outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-[#4a6a8f] h-[45px] w-[300px] p-[20px] rounded-xl' : 'outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-red-700 h-[45px] w-[300px] p-[20px] rounded-xl border-red-400 border-2'}/>
                    <div onClick={signUp} initial={{opacity: 0}} animate={{opacity: 1}} className='bg-[#6a8099] h-[50px] w-[150px] flex items-center justify-center rounded-md cursor-pointer transition eas-in-out delay-90 hover:shadow-md hover:bg-[#4a6a8f]'>
                        <p className='text-[#faefd2]'>Sign Up</p>
                    </div>
                </div>
            </m.div>
        </div>
  )
}

export default GetStarted