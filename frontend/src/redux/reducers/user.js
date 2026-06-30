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
                user: null,
            };

        case "LogoutFail":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };







        // update user information
        case "updateUserInfoRequest":
            return {
                ...state,
                updateUserInfoLoading: true,
            };

        case "updateUserInfoSuccess":
            return {
                ...state,
                updateUserInfoLoading: false,
                user: action.payload,
                success: true,
            };

        case "updateUserInfoFailed":
            return {
                ...state,
                updateUserInfoLoading: false,
                error: action.payload,
            };







        //update user address
        case "updateUserAddressRequest":
            return {
                ...state,
                updateUserAddressLoading: true,
            };

        case "updateUserAddressSuccess":
            return {
                ...state,
                updateUserAddressLoading: false,
                user: action.payload.user,
                success: true,
            };

        case "updateUserAddressFailed":
            return {
                ...state,
                updateUserAddressLoading: false,
                error: action.payload,
            };









        //delete user address
        case "deleteUserAddressRequest":
            return {
                ...state,
                deleteUserAddressLoading: true,
            };

        case "deleteUserAddressSuccess":
            return {
                ...state,
                deleteUserAddressLoading: false,
                user: action.payload.user,
                success: true,
            };

        case "deleteUserAddressFailed":
            return{
                ...state,
                deleteUserAddressLoading: false,
                error: action.payload.message,
            }
        

        case "clearErrors":
            return {
                ...state,
                error: null,
                success: false,
            };

        default:
            return state;
    }
};