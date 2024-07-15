import { createAction, props } from "@ngrx/store";

export const initialAdd = createAction("initialAdd", props<{ data: any }>());

export const updateUser = createAction("updateUser", props<{ newData: any }>());