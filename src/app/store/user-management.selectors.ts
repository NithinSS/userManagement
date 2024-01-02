import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserManagementState, userManagementFeatureKey } from '../reducers/fetchData.reducer';

const selectUserManagementState = createFeatureSelector<UserManagementState>(userManagementFeatureKey);

export const selectUserList = createSelector(selectUserManagementState, (state) => state.users);
export const selectUserListLoading = createSelector(selectUserManagementState, (state) => state.loading);
export const selectUserListError = createSelector(selectUserManagementState, (state) => state.error);
