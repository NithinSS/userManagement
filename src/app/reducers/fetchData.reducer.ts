// import { createReducer, on } from '@ngrx/store';
// import { loadUsers, loadUsersFailure, loadUsersSuccess } from '../user-management.actions';
// import { UserData } from '../user-management.component';

// export interface UserState {
//   users: UserData[];
//   loading: boolean;
//   error: any;
// }

// export const initialState: UserState = {
//     users: [],
//     loading: false,
//     error: null,
// };

// export const userReducer = createReducer(
//   initialState,
//   on(loadUsers, (state) => ({ ...state, loading: true, error: null })),
//   on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
//   on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
// //   on(updateUser, (state, { user }) => ({    ...state, loading: true, error: null}))
// );

import { createReducer, on } from '@ngrx/store';
import { UserData } from '../user-management.component';
import * as UserManagementActions from '../store/user-management.actions';

export const userManagementFeatureKey = 'users';

export interface UserManagementState {
  users: UserData[];
  loading: boolean;
  error: any;
}

export const initialState: UserManagementState = {
  users: [],
  loading: false,
  error: null,
};

export const userManagementReducer = createReducer(
  initialState,
  on(UserManagementActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserManagementActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(UserManagementActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
