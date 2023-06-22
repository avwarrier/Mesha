import {React, useState} from 'react'
import NavBarLogin from '../components/NavBarLogin'
import {motion as m } from "framer-motion"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, signInWithGoogle } from '../../backend/firebase';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [invalidInfoEmail, setInvalidInfoEmail] = useState(false);
    const [shortPass, setShortPass] = useState(false);

    const googleAuthLogin = async() => {
        await signInWithGoogle();
        navigate('/homepage');
    }


    const login = async() => {
        if(email === '') {
            setInvalidInfoEmail(true);
            setEmail('');
            if(password === '') {
                setShortPass(true);
                setPassword('');
                return;
            }
            return;
        }
        if(password === '') {
            setShortPass(true);
            setPassword('');
            return;
        }

        setShortPass(false);
        setInvalidInfoEmail(false);


        console.log(email + " " + password)
            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/homepage")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setInvalidInfoEmail(true);
                setShortPass(true);
                setEmail('');
                setPassword('');
                alert("email or password invalid!")
            });
           
    }

    const forgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!");
          } catch (err) {
            console.error(err);
            alert(err.message);
          }
      }



    return (
        <div className='h-[100vh] bg-[#faefd2] '>
            <NavBarLogin started={false}/>
            <m.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}className='h-[370px] w-[400px] drop-shadow-md rounded-md bg-[#faefd2] mt-[15vh] m-auto flex flex-col items-center justify-center gap-[10px]'>
                <div className='flex items-center justify-between bg-white h-[50px] w-[300px] shadow-md rounded-xl cursor-pointer transition eas-in-out delay-90 hover:shadow-sm' onClick={googleAuthLogin}>
                    <img alt='google' className='ml-[20px] h-[25px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png'/>
                    <p className='mr-[70px] font-light'>Sign-In With Google</p>
                </div>
                <p className='text-[#4a6a8f]'>_________________________</p>
                <div className='h-[210px] w-[300px] flex flex-col items-center justify-center gap-[15px] mt-[15px]'>
                    <input value={email} onChange={(e) => {
                        if(invalidInfoEmail) setInvalidInfoEmail(false);
                        setEmail(e.target.value)
                    }} placeholder='email' className={!invalidInfoEmail ? 'outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-[#4a6a8f] h-[45px] w-[300px] p-[20px] rounded-xl' : 'outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-red-700 h-[45px] w-[300px] p-[20px] rounded-xl border-red-400 border-2'}/>
                    <input value={password} onChange={(e) => {
                        if(shortPass) setShortPass(false);
                        setPassword(e.target.value)
                    }} placeholder='password' type="password" className={!shortPass ? 'outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-[#4a6a8f] h-[45px] w-[300px] p-[20px] rounded-xl' : 'outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-red-700 h-[45px] w-[300px] p-[20px] rounded-xl border-red-400 border-2'}/>
                    <p onClick={forgotPassword} className='cursor-pointer text-[13px]'>forgot password?</p>
                    <div onClick={login} initial={{opacity: 0}} animate={{opacity: 1}} className='bg-[#6a8099] h-[50px] w-[150px] flex items-center justify-center rounded-md cursor-pointer transition eas-in-out delay-90 hover:shadow-md hover:bg-[#4a6a8f]'>
                        <p className='text-[#faefd2]'>login</p>
                    </div>
                </div>
            </m.div>
        </div>
        
  )
}

export default Login