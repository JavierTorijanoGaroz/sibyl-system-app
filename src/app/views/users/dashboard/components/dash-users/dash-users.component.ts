import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UsersService } from 'src/app/core/users.service';
import { LocationsService } from 'src/app/core/locations.service';
import { User } from 'src/app/core/user.model';
import { Observable, from } from 'rxjs';


type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-dash-users',
  templateUrl: './dash-users.component.html',
  styleUrls: ['./dash-users.component.scss']
})
export class DashUsersComponent implements OnInit {

  users: Observable<User[]>
  allUsers: Observable<User[]>
  user: User
  selectedUser: User
  roles: string[] = []
  locations: string[] = []
  defaultLocationOpt: string = ''
  defaultRolOpt: string = ''
  searchOptions: any = [
    { text: 'Email', value: '0' },
    { text: 'Name', value: '1' },
    { text: 'Lastname1', value: '2' },
    { text: 'Lastname2', value: '3' },
    { text: 'Location', value: '4' },
    { text: 'Rol', value: '5' }
  ]
  showPass: boolean
  spinIcon: boolean

  constructor(private us: UsersService, private ls: LocationsService, private fb: FormBuilder) {
    this.spinIcon = false
  }

  ngOnInit() {
    this.initData()
    this.users = this.us.getAllUsers()
    this.allUsers = this.users
    this.showPass = false
  }

  async initData() {
    await this.ls.getAllLocations().subscribe(data => {
      data.forEach(element => {
        this.locations.push(element.name)
      });
      this.roles = ['Administrador', 'User']
    })
  }

  onCreateUser(form: NgForm): void {
    console.log(form.value)
    this.us.createUser(
      form.value.userEmail,
      form.value.userPassword,
      form.value.userName,
      form.value.userLastName1,
      form.value.userLastName2,
      form.value.userLocation,
      form.value.userRol)
    this.resetForm(form)
  }

  onReadUser(form: NgForm): void {
    switch (form.value.searchOption.value) {
      case "0": { // By email
        this.users = this.us.getUserByEmail(form.value.searchField)
        break;
      }
      case "1": { // By name        
        this.users = this.us.getUserByName(form.value.searchField)
        break;
      }
      case "2": { // By lastname1
        this.users = this.us.getUserByLastName1(form.value.searchField)
        break;
      }
      case "3": { // By lastname2
        this.users = this.us.getUserByLastName2(form.value.searchField)
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
      lastName1: form.value.userLastName1,
      lastName2: form.value.userLastName2,
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

  syncUsers(): void {
    this.users = this.allUsers
    console.log('Sync Users')
  }

  resetForm(form: NgForm): void {
    form.resetForm()
  }

}
