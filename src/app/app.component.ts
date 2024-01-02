import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { StoreModule } from '@ngrx/store';
import { userManagementReducer } from './reducers/fetchData.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'userManagment';
  constructor(){
    StoreModule.forRoot({
      users: userManagementReducer,
    })
  }
}
