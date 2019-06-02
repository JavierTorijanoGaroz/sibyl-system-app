import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../core/user.model';

const config = {
  apiKey: "AIzaSyAHRYpFzuLeyx-mLJIRyfB5O2-jReNRjn8",
  authDomain: "fir-test-6c46e.firebaseapp.com",
  databaseURL: "https://fir-test-6c46e.firebaseio.com",
  projectId: "fir-test-6c46e",
  storageBucket: "fir-test-6c46e.appspot.com",
  messagingSenderId: "865223523829"
};
const auxFirebaseApp = firebase.initializeApp(config, "AuxiliaryApp");

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<User>
  private users: Observable<User[]>
  private userDoc: AngularFirestoreDocument<User>
  private user: Observable<User>

  public selectedUser: User = {
    uid: null
  }

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users')
    this.users = this.usersCollection.valueChanges()
  }

  createUser(email: string, password: string, name: string, lastName1: string, lastName2: string, location: string, rol: string) {
    auxFirebaseApp.auth().createUserWithEmailAndPassword(email, password).
      then(userCredential => {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${userCredential.user.uid}`);
        const userData: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          password: password,
          name: name,
          lastName1: lastName1,
          lastName2: lastName2,
          location: location,
          rol: rol
        }
        userRef.set(userData)
        auxFirebaseApp.auth().signOut();
        console.log("User " + userCredential.user.uid + " created successfully!");
      }).catch(error => this.handleError(error))
  }

getAllUsers() {
     return this.users =this.usersCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as User
          data.uid = action.payload.doc.id
          return data
        })
      }))
  }

  getUserByUID(userUID: string) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.where('uid', '==', userUID)
    })
    return this.users = this.usersCollection.valueChanges()
  }

  getUserByEmail(userEmail: string) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.where('email', '==', userEmail)
    })
    return this.users = this.usersCollection.valueChanges()
  }

  getUserByName(userName: string) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.where('name', '==', userName)
    })
    return this.users = this.usersCollection.valueChanges()
  }

  getUserByLastName1(userLastName1: string) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.where('lastName1', '==', userLastName1)
    })
    return this.users = this.usersCollection.valueChanges()
  }

  getUserByLastName2(userLastName2: string) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.where('lastName2', '==', userLastName2)
    })
    return this.users = this.usersCollection.valueChanges()
  }

  getUserByLocation(userLocation: string) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.where('location', '==', userLocation)
    })
    return this.users = this.usersCollection.valueChanges()
  }

  getUserByRol(userRol: string) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.where('rol', '==', userRol)
    })
    return this.users = this.usersCollection.valueChanges()
  }

  updateUser(user: User): void {
    // Update user document stored on Firestore
    this.afs.doc<User>(`users/${user.uid}`).update(user)
  }

  deleteUser(user: User): void {
    // Delete user from Firebase Authentication System
    auxFirebaseApp.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        auxFirebaseApp.auth().currentUser.delete();
        this.afs.doc<User>(`users/${user.uid}`).delete()  // Delete user data from Firestore
        console.log("User " + userCredential.user.uid + " deleted successfully!")
      }).catch(error => this.handleError(error))
  }

  private handleError(error) {
    console.error(error)
  }
}
