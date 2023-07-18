import React from 'react'
import DueDatePanel from './DueDatePanel'

const NotesPanel = (props) => {
  return (
    <div className='bg-[#ffffff] drop-shadow-md h-[80vh] w-[240px] rounded-md'>
      <DueDatePanel dueChange={props.dueChange} setDueChange={props.setDueChange} updateDues={props.updateDues} userEmail={props.userEmail} dues={props.dues}/>
    </div>
  )
}

export default NotesPanel