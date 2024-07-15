import { createReducer, on } from "@ngrx/store"
import { initialState } from "./user.state"
import { initialAdd, updateUser } from "./users.actions"

const _userReducer = createReducer(initialState, on(initialAdd, (state, action) => {
    return {
        ...state,
        id: action.data._id ? action.data._id : state.id,
        fullName: action.data.fullName ? action.data.fullName : state.fullName,
        email: action.data.email ? action.data.email : state.email,
        about: action.data.about ? action.data.about : state.about,
        image: action.data.image ? action.data.image : state.image
    }
}),
    on(updateUser, (state, action) => {
        return {
            ...state,
            id: action.newData.id ? action.newData.id : state.id,
            fullName: action.newData.fullName ? action.newData.fullName : state.fullName,
            email: action.newData.email ? action.newData.email : state.email,
            about: action.newData.about ? action.newData.about : state.about,
            image: action.newData.image ? action.newData.image : state.image
        }
    })
)

export function userReducer(state: any, action: any) {
    return _userReducer(state, action)
}