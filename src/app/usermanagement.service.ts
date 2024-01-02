import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserManagementActions from './store/user-management.actions';
import { AppState } from './app.state';

@Injectable({
  providedIn: 'root',
})
export class UsermanagementService {
  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getUsers(): Observable<any> {
    this.store.dispatch(UserManagementActions.loadUsers());
    return this.http.get(this.apiUrl);
  }
}
