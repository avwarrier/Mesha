import {React, useEffect, useState} from 'react'
import LinkAdd from './subpieces/LinkAdd'

const AssociatedLinks = (props) => {

    const [links, setLinks] = useState(['default']);

    useEffect(() => {
            let temp = [...props.links];
            temp.push('default');
            setLinks(temp);
    }, [props.links])

    const addLink = (link) => {
        let temp = [...links];
        temp[temp.length-1] = link;
        temp.push('default');
        setLinks(temp);

    }
    

    const deleteLink = (link) => {
        let temp = [...links];
        console.log(link + " jsdijidjfidjf")
        for(let i = 0; i < temp.length; i++) {
            if(temp[i] == link) {
                temp.splice(i, 1);
                break;
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