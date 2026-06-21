const initialState = {
    isSeller: false,
    isLoading: false,
};

export const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LoadSellerRequest":
            return {
                ...state,
                isLoading: true,
            };

        case "LoadSellerSuccess":
            return {
                ...state,
                isSeller: true,
                isLoading: false,
                seller: action.payload,
            };

        case "LoadSellerFail":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                isSeller: false,
            };

        case "LogoutRequest":
            return {
                ...state,
                isLoading: true,
            };

        case "LogoutSuccess":
            return {
                ...state,
                isLoading: false,
                isSeller: false,
                seller: null,
            };

        case "LogoutFail":
            return {
                ...state,
                isLoading: false,
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