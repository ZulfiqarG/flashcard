
import React, { useRef } from 'react'
import { FaRegCopy, FaTimes } from "react-icons/fa";
const Modal = ({ groupId, cardId, visible, handleClose, notify }) => {

    const copyLink = useRef() // reference of the anchor tag
    const handleCopy = () => {
        navigator.clipboard.writeText(copyLink.current.href)
        notify('Linked Copied to Clipboard')
    }
    if (!visible) return null
    return (
        <div id="dismiss" onClick={(e) => handleClose(e)} className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white p-2 relative rounded-md w-72 md:w-96 h-32'>
                <FaTimes id="dismiss-x"
                    className=' absolute right-3 p-1 text-gray-500 hover:text-red-500  top-3'
                    onClick={(e) => handleClose(e)}
                    size={'1.5rem'}
                />
                <div className='p-6 flex  items-center justify-center space-x-3'>
                    <div className=' border-dashed border w-64 overflow-hidden border-gray-400 rounded-md px-3 py-1 text-sm '>
                        <p className='text-gray-500'>Link:<a ref={copyLink} target='_blank' rel="noreferrer" href={`https://flashcard-zulfiqarsk.netlify.app/card/${groupId}/${cardId}`} className='ml-1 text-blue-500'>{`https://flashcard-generator-jaychandlani.vercel.app/card/${groupId}/${cardId}`}</a></p>
                    </div>
                    <FaRegCopy
                        onClick={handleCopy}
                        className='text-gray-500 text-lg hover:text-blue-500 hover:translate-y-px transition-all ease-in-out' />
                </div>
            </div>
        </div>
    )
}

export default Modal