
const addRef = (state = '', action) => {
    if (action.type === 'addRef') {
        return action.payload;
    } else {
        return state
    }
}

export default addRef;