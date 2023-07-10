import {React, useEffect, useState} from 'react'
import LinkAdd from './subpieces/LinkAdd'

const AssociatedLinks = () => {

    const [links, setLinks] = useState(['default']);

    const addLink = (link) => {
        let temp = [...links];
        temp[temp.length-1] = link;
        temp.push('default');
        setLinks(temp);

    }
    

    const deleteLink = (link) => {
        let temp = [...links];
        console.log(temp, " ", link)
        for(let i = 0; i < temp.length; i++) {
            if(temp[i] == link) {
                temp.splice(i, 1);
            }
        }
        console.log(temp);
        setLinks(temp);
    }

  return (
    <div className='h-[35%] w-[85%] mt-[1%] flex flex-col gap-[0px] overflow-auto'>
        {
            links.map(link => {
                console.log(link);
                return <LinkAdd link={link} addLink={addLink} deleteLink={deleteLink}/>
            })
        }
    </div>
  )
}

export default AssociatedLinks