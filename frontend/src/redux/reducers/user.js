const initialState = {
    isAuthenticated: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LoadUserRequest":
            return {
                ...state,
                loading: true,
            };

        case "LoadUserSuccess":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };

        case "LoadUserFail":
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
            };

        case "clearErrors":
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};






