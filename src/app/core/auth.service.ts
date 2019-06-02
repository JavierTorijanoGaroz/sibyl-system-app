import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NotifyService } from './notify.service';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { User } from '../core/user.model';



var config = {
  apiKey: "AIzaSyAHRYpFzuLeyx-mLJIRyfB5O2-jReNRjn8",
  authDomain: "fir-test-6c46e.firebaseapp.com",
  databaseURL: "https://fir-test-6c46e.firebaseio.com",
  projectId: "fir-test-6c46e",
  storageBucket: "fir-test-6c46e.appspot.com",
  messagingSenderId: "865223523829"
};
var admin = firebase.initializeApp(config, "Secondary");

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // Logged in -> get custom user from Firestore
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          // Logged out -> null
          return of(null)
        }
      }
      ));
  }

  getUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.setUserDoc(user) // create initial user document
      }).catch(error => this.handleError(error));
  }

  emailSignUpAdmin(email: string, password: string, name: string, lastName1: string, lastName2: string, location: string, rol: string) {
    admin.auth().createUserWithEmailAndPassword(email, password).
      then(user => {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.user.uid}`);
        const userData: User = {
          uid: user.user.uid,
          email: email,
          password: password,
          name: name,
          lastName1: lastName1,
          lastName2: lastName2,
          location: location,
          rol: rol
        }
        console.log("User " + user.user.uid + " created successfully!");
        userRef.set(userData)
        admin.auth().signOut();
      }).catch(error => this.handleError(error));
  }

  // Update properties on the user document
  updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data)
  }

  /**
   * Login
   * 
   * @param email 
   * @param password 
   */
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(userCredential => {
      this.router.navigate(['/user', userCredential.user.uid])
    }).catch(error => this.handleError(error))
  }

  /**
   * Sends email allowing user to reset password
   */
  resetPassword(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error))
  }

  /**
   * SignOut
   */
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }
  // https://fireship.io/lessons/angularfire-google-oauth/

  /**
   * Sets user data to firestore after succesful login
   * 
   * @param user The user
   */
  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      name: user.name,
      password: 'Password',
      lastName1: 'Lastname1',
      lastName2: 'Lastname2',
      location: 'Location',
      rol: 'Rol'
    }
    return userRef.set(data)
  }

  /**
   * If error, console log and notify user
   * 
   * @param error The error
   */
  private handleError(error) {
    console.error(error)
    this.notify.update(error.message, 'error')
  }

  ////// OAuth Methods /////
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.setUserDoc(credential.user)
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.setUserDoc(user) // if using firestore
      })
      .catch(error => this.handleError(error));
  }
}
