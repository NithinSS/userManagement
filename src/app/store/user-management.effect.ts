import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsermanagementService } from '../usermanagement.service';
import * as UserManagementActions from './user-management.actions';

@Injectable()
export class UserManagementEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserManagementActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserManagementActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserManagementActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UsermanagementService) {}
}
