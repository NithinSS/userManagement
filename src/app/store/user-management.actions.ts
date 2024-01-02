import { createAction, props } from '@ngrx/store';
import { UserData } from '../user-management.component';

export const loadUsers = createAction('[User Management] Load Users');
export const loadUsersSuccess = createAction('[User Management] Load Users Success', props<{ users: UserData[] }>());
export const loadUsersFailure = createAction('[User Management] Load Users Failure', props<{ error: any }>());
