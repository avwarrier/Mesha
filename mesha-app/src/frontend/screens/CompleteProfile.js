import {React, useState} from 'react'
import NavBarLogin from '../components/NavBarLogin'
import {motion as m } from "framer-motion"
import { auth } from '../../backend/firebase'
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CompleteProfile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [level, setLevel] = useState('');


    const updateDB = async() => {
        
    }

    
  return (
    <div className='h-[100vh] bg-[#faefd2] '>
            <NavBarLogin started={true}/>
            <m.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}className='h-[300px] w-[400px] drop-shadow-md rounded-md bg-[#faefd2] mt-[15vh] m-auto flex flex-col items-center justify-center gap-[20px]'>
                
                    <input value={firstName} onChange={(e) => {
                        setFirstName(e.target.value)
                    }} placeholder='First Name' className='outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-[#000] h-[45px] w-[300px] p-[20px] rounded-xl' />
                    
                    <input value={lastName} onChange={(e) => {
                        setLastName(e.target.value)
                    }} placeholder='Last Name' className='outline-none bg-[#ede1be] font-light placeholder:font-thin placeholder:text-[#000] h-[45px] w-[300px] p-[20px] rounded-xl'/>

                    <FormControl sx={{width: "300px", color: "#4a6a8f"}}>
                        <InputLabel >Level</InputLabel>
                        <Select
                            
                            labelId="level-label"
                            value={level}
                            label="Level"
                            onChange={(e) => setLevel(e.target.value)}
                            >
                            <MenuItem  value={10}>Student</MenuItem>
                            <MenuItem  value={20}>Teacher</MenuItem>
                            <MenuItem value={30}>Teaching Assistant</MenuItem>
                        </Select>
                    </FormControl>

                    <div onClick={updateDB}  initial={{opacity: 0}} animate={{opacity: 1}} className='bg-[#6a8099] h-[50px] w-[150px] flex items-center justify-center rounded-md cursor-pointer transition eas-in-out delay-90 hover:shadow-md hover:bg-[#4a6a8f]'>
                        <p className='text-[#faefd2]'>Continue</p>
                    </div>
                
            </m.div>
        </div>
  )
}

export default CompleteProfile