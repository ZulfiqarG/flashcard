import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FlashCardGroup from '../components/FlashCardGroup'
import greyImage from '../image/grey.jpg';

const MyFlashCard = () => {
    const data = useSelector(state => state.card)  // use a redux selector ;

    
    return (
        <div className='md:mt-10  px-5  xl:px-44  my-5'>
            <div className='grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4'>

                {data.length ? data.map((items, index) => {

                    return (
                        <FlashCardGroup key={Math.random()} items={items} index={index} />
                    )

                }) : ""}
            </div>
            {data.length
                ? ""
                : <div className=' relative top-24'>
                    <h1 className='text-center text-xl font-bold text-slate-600 font-serif '>Flashcard is not avaliable!</h1>
                    <img className="mx-auto w-50 h-50 pb-3 rounded-2xl" src={greyImage} alt="logo" />
                    <Link to={'/'} className=' w-40  mx-auto px-4 block py-2 text-sm font-medium text-center text-red-500 bg-grey-100 rounded-lg hover:bg-red-500 hover:text-white border-red-500 border-2  hover:-translate-y-1 shadow-lg transition-all ease-in-out duration-150'>Create Cards</Link>
                </div>}
        </div>
    )
}

export default MyFlashCard