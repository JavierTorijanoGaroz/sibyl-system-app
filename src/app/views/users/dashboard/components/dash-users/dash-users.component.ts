import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UsersService } from 'src/app/core/users.service';
import { User } from '../../../../../core/user.model';
import { Observable } from 'rxjs';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-dash-users',
  templateUrl: './dash-users.component.html',
  styleUrls: ['./dash-users.component.scss']
})
export class DashUsersComponent implements OnInit {

  userForm: FormGroup;

  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
    'name': { 'required': 'Name is required.' },
    'lastName': { 'required': 'Lastname is required.' },
    'location': { 'required': 'Location is required.' }
  };

  constructor(private us: UsersService, private fb: FormBuilder) {
    this.spinIcon = false
  }

  users: Observable<User[]>
  allUsers: Observable<User[]>
  user: User
  selectedUser: User

  roles: string[] = ['Administrador', 'User']
  locations: any = ['Unit 01', 'Unit 02', 'Unit 03', 'Unit 04', 'Unit 05']  // TODO: Add location by firebase document
  searchOptions: any = [
    { text: 'Uid', value: '0' },
    { text: 'Email', value: '1' },
    { text: 'Name', value: '2' },
    { text: 'Lastname', value: '3' },
    { text: 'Location', value: '4' },
    { text: 'Rol', value: '5' }
  ]
  showPass: boolean

  spinIcon: boolean

  ngOnInit() {
    this.buildForm()
    this.users = this.us.getAllUsers()
    this.allUsers = this.users
    this.showPass = false
  }

  onCreateUser(): void {
    this.us.createUser(this.userForm.value['email'],
      this.userForm.value['password'],
      this.userForm.value['name'],
      this.userForm.value['lastName'],
      this.userForm.value['location'],
      this.userForm.value['rol'])
  }

  initComponent(): void {
    this.buildForm()
    this.showPass = false
  }

  onReadUser(form: NgForm): void {
    switch (form.value.searchOption.value) {
      case "0": { // By uid
        this.users = this.us.getUserByUID_V2(form.value.searchField)
        break;
      }
      case "1": { // By email
        this.users = this.us.getUserByEmail(form.value.searchField)
        break;
      }
      case "2": { // By name        
        this.users = this.us.getUserByName(form.value.searchField)
        break;
      }
      case "3": { // By lastname
        this.users = this.us.getUserByLastName(form.value.searchField)
        break;
      }
      case "4": { // By location
        this.users = this.us.getUserByLocation(form.value.searchField)
        break;
      }
      case "5": { // By rol
        this.users = this.us.getUserByRol(form.value.searchField)
        break;
      }
      default: { // Invalid option 
        console.log("Invalid option...")
        break;
      }
    }
  }


  onUpdateUser(form: NgForm): void {
    let updatedUser: User = {
      uid: this.selectedUser.uid,
      email: form.value.userEmail,
      password: form.value.userPassword,
      name: form.value.userName,
      lastName: form.value.userLastName,
      location: form.value.userLocation,
      rol: form.value.userRol,
    }
    this.us.updateUser(updatedUser)
  }

  onDeleteUser(user: User): void {
    this.us.deleteUser(user)
  }

  selectUser(user: User): void {
    this.us.selectedUser = Object.assign({}, user)
    this.selectedUser = this.us.selectedUser
  }

  showPassword(): void {
    this.showPass = !this.showPass
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
      'name': ['', [
        Validators.required
      ]],
      'lastName': ['', [
        Validators.required
      ]],
      'location': ['', [
        Validators.required
      ]],
      'rol': ''
    });
    this.userForm.controls['rol'].setValue(this.roles[1], { onlySelf: true });
    this.userForm.controls['location'].setValue(this.locations[0], { onlySelf: true });
    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any): void {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
              }
            }
          }
        }
      }
    }
  }

  syncUsers(): void {
    this.users = this.allUsers
    console.log('Sync Users')
  }

  resetForm(form: NgForm): void {
    form.resetForm()
  }

}
