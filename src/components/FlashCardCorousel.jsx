
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import tower from '../image/golden-tower.jpg';
import { addCardId, addRef } from '../redux/actions'
const FlashCardCorousel = () => {

    const dispatch = useDispatch();
    let id = useParams().index
    const cardRef = useRef();
    const { groupId, cardId } = useSelector(state => state.id)    // obtaining the state's link id
       const cardData = useSelector(state => state.card)   //obtaining card information from redux state


    useEffect(
        () => {
            dispatch(addCardId(parseInt(id)))
            dispatch(addRef(cardRef))
        } // updating the redux state with the current id and reference
        // eslint-disable-next-line
        , [id])

    return (
        <div ref={cardRef} className='rounded-md w-80 md:min-w-[500px] lg:min-w-[600px]  2xl:min-w-[700px] h-[450px] lg:space-y-0   overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-2 p-5 space-x-4 space-y-8 items-center shadow-sm'>
            <div className=' bg-gray-100 overflow-hidden'>
                <img className=' object-cover w-90 h-70 mx-auto rounded-md' alt='flashcard-img'
                    src={cardData[groupId].card[cardId].image
                        ? cardData[groupId].card[cardId].image
                        :  tower } />
            </div>
            <h3 className='p-2 overflow-hidden'>
                {cardData[groupId].card[cardId].defination}
            </h3>
        </div>
    )
}

export default FlashCardCorousel