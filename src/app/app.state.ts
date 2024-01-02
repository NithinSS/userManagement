import * as fromUserManagement from '../app/reducers/fetchData.reducer';

export interface AppState {
  userManagement: fromUserManagement.UserManagementState;
  // Add other feature states here if you have more features
}
