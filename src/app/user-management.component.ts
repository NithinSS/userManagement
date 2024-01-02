import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UsermanagementserviceService } from './usermanagementservice.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NameFormatPipe } from './name-format.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { take, timer } from 'rxjs';
import { UsermanagementService } from './usermanagement.service';
import { Store, StoreModule } from '@ngrx/store';
import { loadUsers } from './store/user-management.actions';
import { selectUserList, selectUserListLoading } from './store/user-management.selectors';
import { userManagementFeatureKey, userManagementReducer } from './reducers/fetchData.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserManagementEffects } from './store/user-management.effect';

export interface UserData {
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
}

export interface UserListResponse {
  users: UserData[];
  total: number;
  skip: number;
  limit: number;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'], // Change styleUrl to styleUrls
  standalone: true,
  imports: [CommonModule, MatTableModule, HttpClientModule, MatButtonModule, MatIconModule, ReactiveFormsModule, NameFormatPipe, MatProgressSpinnerModule, 
    // StoreModule.forRoot(),
    // StoreModule.forRoot({ [userManagementFeatureKey]: userManagementReducer }),

    ],
  providers: [UsermanagementService, ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UserManagementComponent implements OnInit {

  columnsToDisplay: string[] = ['firstName', 'lastName', 'maidenName', 'age'];
  dataSource: UserData[] = [];
  expandedElement: UserData | null = null;
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  editForm!: FormGroup;
  processing: boolean = false;

  constructor(private fb: FormBuilder, private userService: UsermanagementService, private store: Store) {
    
   }

  ngOnInit() {
    this.initializeForm();
    this.fetchData();

    // Subscribe to the state changes
    this.store.select(selectUserList).subscribe((users) => {
      this.dataSource = users;
    });

    // Subscribe to the loading state
    this.store.select(selectUserListLoading).subscribe((loading) => {
      this.processing = loading;
    });

    if (this.expandedElement) {
      this.setFormValues(this.expandedElement);
    }
  }
 initializeForm() {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      maidenName: [''],
      age: ['', [Validators.required, Validators.maxLength(3)]],
    });
  }

  fetchData() {
    // Dispatch the loadUsers action to trigger the effect
    this.store.dispatch(loadUsers());
  }
  // fetchData() {
  //   this.userService.getUsers().subscribe((data) => {
  //       this.dataSource = data.users;
  //       console.log('data', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }


  onSubmit() {
    if (this.editForm.valid) {
      const editedData = this.editForm.value;
      this.processing = true;

      timer(5000).pipe(take(1)).subscribe(() => {
        this.dataSource = this.dataSource.map((user: any) =>
          user === this.expandedElement ? { ...user, ...editedData } : user
        );
        this.editForm.reset();
        this.processing = false;
      });
    }
  }
  onCancel() {
  }

  setFormValues(user: UserData) {
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      maidenName: user.maidenName,
      age: user.age,
    });
  }
}
