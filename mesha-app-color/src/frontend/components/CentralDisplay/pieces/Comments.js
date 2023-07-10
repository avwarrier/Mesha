import {React, useEffect, useState} from 'react'
import Comment from './subpieces/Comment';
import AddIcon from '@mui/icons-material/Add';

const Comments = (props) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(props.comments);
    }, [props.comments])

    const addComment = (comment) => {
        let temp = [...comments];
        temp.unshift(comment);
        setComments(temp);
        console.log(temp);
    }

    const setComment = (prev, desc) => {
        let temp = [...comments];
        console.log(temp);
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].name == prev) {
                temp[i].name = desc;
                return;
            }
        }
        setComments(temp);
        console.log(temp);
    }

    const deleteComment = (comment) => {
        let temp = [...comments];
        if(comment == '') {
            for(let i = 0; i < temp.length; i++) {
                if(temp[i].name == 'default') {
                    temp.splice(i, 1);
                }
            }
        }

        console.log(temp);
        console.log(comment)
        for(let i = 0; i < temp.length; i++) {
            if(temp[i].name == comment) {
                temp.splice(i, 1);
            }
        }
        setComments(temp);
    }


  return (
    <div className='w-[100%] rounded-md flex flex-col h-[76vh] bg-[#f5f5f5] items-center justify-between'>
        <div className='w-[100%] flex flex-col items-center mt-[10px]'>
            <p className='font-light text-[17px] underline'>Comments/Progress</p>
            <div className='overflow-auto h-[58vh] mt-[10px] w-[100%]'>
            {
                comments.map(comment => {
                    return <Comment setComment={setComment} deleteComment={deleteComment} comment={comment}/>
                })
            }
            </div>
        </div>
        <div onClick={() => {
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
            let today = new Date();
            let date = monthNames[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear()
            let hour = today.getHours();
            if(hour > 12) {
                hour -= 12;
            } else if (hour == 0) {
                hour = 12;
            }
            let minute = '';
            if(today.getMinutes() < 10) {
                minute = '0' + today.getMinutes();
            } else {
                minute = today.getMinutes();
            }
            let time = hour + ":" + minute;
            addComment({
                name: 'default',
                date: date,
                time: time,
            })
        }} className='w-[180px] h-[40px] bg-[#4a6a8f] rounded-3xl shadow-md flex items-center justify-center cursor-pointer transition eas-in-out delay-90 hover:bg-[#3a6391] mb-[10px] hover:shadow-lg'>
            <AddIcon sx={{color: "#ffffff"}}/>
        </div>
        
    </div>
  )
}

export default Comments