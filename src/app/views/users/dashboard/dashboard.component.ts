import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../..//core/auth.service'
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title: string = 'Sibyl System'
  toggledClassApplied: boolean = false

  currentUser: any
  name: string
  email: string
  photoUrl: string
  emailVerified: boolean
  uid: string

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    this.getUserData()
  }

  async getUserData() {
    let user = firebase.auth().currentUser
    if (user != null) {
      this.currentUser = user
      this.name = user.displayName
      this.email = user.email
      this.photoUrl = user.photoURL
      this.emailVerified = user.emailVerified
      this.uid = user.uid
    }
  }

  toggledClass() {
    this.toggledClassApplied = !this.toggledClassApplied
  }

  logout() {
    this.auth.signOut()
  }

}
