
const initialState = { groupId: 0, cardId: 0 }

const setId = (state = initialState, action) => {
    if (action.type === 'addGroupId') {
        return { groupId: action.payload, cardId: state.cardId }
    } else if (action.type === 'addCardId') {
        return { groupId: state.groupId, cardId: action.payload }
    } else {
        return state
    }
}

export default setId;