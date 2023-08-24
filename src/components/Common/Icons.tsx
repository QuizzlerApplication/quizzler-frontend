import {BiSolidHome, BiSolidCompass, BiSolidUserCircle} from 'react-icons/bi';
import { IoMdClose} from 'react-icons/io';
interface IIcons {
    type : string,
    size: number,
    color?: string
}

const Icons = ({type, size, color}:IIcons) => {
  return (
    <div className='text-white'>{
      {
        close: <IoMdClose size={size} color={color}/>,
        home: <BiSolidHome size={size} color={color}/>, 
        explore: <BiSolidCompass size={size} color={color}/>, 
        user: <BiSolidUserCircle size={size} color={color}/>
      }[type]
    }</div>
  )
}

export default Icons;