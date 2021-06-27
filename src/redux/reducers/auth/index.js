const authReducer = (state = { shouldLogout: false }, action) => {
    switch (action.type) {
        case 'SHOULD_LOGOUT':
            return { ...state, shouldLogout: action.payload };
        default:
            return { ...state };
    }
};

export default authReducer;
