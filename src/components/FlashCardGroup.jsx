
import React from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeCard } from '../redux/actions';
import mars from '../image/mars.jpg'
import { toast } from 'react-toastify';
const FlashCardGroup = ({ items, index }) => {
    const dispatch = useDispatch()

    // removes the card from the state function
    const handleDelete = (items) => {
        dispatch(removeCard(items))
        notify();
    }
    const notify = () => toast.success('Group has been removed', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    
    return (
        <div className="mx-auto w-full mt-10 max-w-sm max-h-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all ease-in-out duration-300 hover:-translate-y-1">

            <div className="flex flex-col items-center relative pb-10">

                {items.groupicon
                    ? <img src={items.groupicon} alt='groupicon' className={'object-cover transition-all ease-in-out duration-500 hover:-translate-y-1 hover:rounded-md w-24 h-24 mb-3 rounded-rounded-lg ... shadow-lg absolute -top-10'} />
                    :<img className="transition-all object-cover ease-in-out duration-500 hover:-translate-y-1 hover:rounded-md w-24 h-24 mb-3 rounded-rounded-lg ... shadow-lg absolute bg-blue-300 -top-10" src={mars} alt="groupicon" />} 

                <FaTimes className='absolute right-2 top-2 text-slate-300 text-lg hover:text-red-400'

                   // {/* The selected card can be deleted using the onClick method.*/}
                    onClick={() => handleDelete(items)} />

                <h5 className="mb-1 mt-16 text-xl font-medium text-gray-900"> {items.group}</h5>
                <h5 className='text-center  truncate w-full p-2'>{items.description} </h5>
                <span className="text-sm text-gray-500 font-medium"> Cards-{items.card ? items.card.length : ""} </span>
                <div className="flex mt-4 space-x-3 md:mt-6">

                     {/* the card details link */}


                    <Link to={`/card/${index}/${0}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-red-500 bg-white rounded-lg hover:bg-red-500 hover:text-white border-red-500 border-2  hover:-translate-y-1 shadow-md transition-all ease-in-out duration-500">
                        View Cards
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default FlashCardGroup