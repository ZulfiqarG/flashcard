
const initialState = []

const handleCard = (state = initialState, action) => {
    if (action.type === 'add') {
        localStorage.setItem('card', JSON.stringify([...state, action.payload]))
        return [...state, action.payload]

    } else if (action.type === 'remove') {

        let cardData = state.filter(obj => state.indexOf(obj) !== state.indexOf(action.payload));
        localStorage.setItem('card', JSON.stringify(cardData))

        return cardData
    } else if (action.type === 'local') {

        return [...state, ...action.payload]
        
    } else {
        return state
    }
}

export default handleCard;