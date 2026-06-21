const initialState = {
    isAuthenticated: false,
};

export const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LoadSellerRequest":
            return {
                ...state,
                loading: true,
            };

        case "LoadSellerSuccess":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                shop: action.payload,
            };

        case "LoadSellerFail":
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
            };

        case "LogoutRequest":
            return {
                ...state,
                loading: true,
            };

        case "LogoutSuccess":
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                shop: null,
            };

        case "LogoutFail":
            return {
                ...state,
                loading: false,
                error: action.payload,
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






