import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userState } from "./user.model";

const getUserState = createFeatureSelector<userState>('user');

export const getUserName = createSelector(getUserState, (state) => {
    return state.fullName;
});

export const getUserEmaul = createSelector(getUserState, (state) => {
    return state.email;
});