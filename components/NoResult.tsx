import React from 'react'
import { BiCommentX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'
interface IProps {
    text: string
}
const NoResult = ({ text }: IProps) => {
    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <p className='text-8xl'>
                {text === 'No Comments Yet !' ? <BiCommentX /> : <MdOutlineVideocamOff />}
            </p>
            <p className="text-2xl text-center">{text}</p>
        </div>
    )
}

export default NoResult