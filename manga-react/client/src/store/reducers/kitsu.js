const defaultState = {
    message: 'Test Kitsu',
    data: []
}

export default function (state=defaultState, action) {
    const {type} = action

    switch (type) {
        case 'SET_DATA': 
            return { data: action.data};
        default: 
            return state;
    }
}