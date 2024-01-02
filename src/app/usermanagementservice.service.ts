import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementserviceService {
  static getUser() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
