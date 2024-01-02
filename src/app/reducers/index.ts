import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { userManagementReducer } from './fetchData.reducer';
// import { userReducer } from '../../app/reducers/fetchData.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
 fetchData: userManagementReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
