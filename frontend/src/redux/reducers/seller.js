const initialState = {
    isSeller: false,
    isLoading: true,
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

        case "SellerLogoutRequest":
            return {
                ...state,
                isLoading: true,
            };

        case "SellerLogoutSuccess":
            return {
                ...state,
                isLoading: false,
                isSeller: false,
                seller: null,
            };

        case "SellerLogoutFail":
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