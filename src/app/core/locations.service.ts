import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locationsCollection: AngularFirestoreCollection<Location>
  private locations: Observable<Location[]>
  private locationDoc: AngularFirestoreDocument<Location>
  private location: Observable<Location>
  public selectedLocation: Location = {
    uid: null
  }

  allLocationsNames: string[]

  constructor(private afs: AngularFirestore) {
    this.locationsCollection = this.afs.collection<Location>('locations')
    this.locations = this.locationsCollection.valueChanges()
  }

  /**
    * Add a new location document stored on Firestore
    * @param location 
    */
  createLocation(location: Location) {
    this.afs.collection("locations").add(location)
      .then(docRef => {
        location.uid = docRef.id
        this.updateLocation(location)
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      })
  }

  /**
   * Read all locations documents stored on Firestore
   */
  getAllLocations() {
    return this.locations = this.locationsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Location
          data.uid = action.payload.doc.id
          return data
        })
      }))
  }

  /**
   * Get a location by UID
   * 
   * @param locationUID The location's uid number
   */
  getLocationByUID(locationUID: string) {
    this.locationsCollection = this.afs.collection<Location>('locations', ref => {
      return ref.where('uid', '==', locationUID)
    })
    return this.locations = this.locationsCollection.valueChanges()
  }

  /**
  * Get a location by ID
  * 
  * @param locationID The location's ID
  */
  getLocationByID(locationID: string) {
    this.locationsCollection = this.afs.collection<Location>('locations', ref => {
      return ref.where('id', '==', locationID)
    })
    return this.locations = this.locationsCollection.valueChanges()
  }

  /**
   * Get a location by Name
   * 
   * @param locationName The location's name
   */
  getLocationByName(locationName: string) {
    this.locationsCollection = this.afs.collection<Location>('locations', ref => {
      return ref.where('name', '==', locationName)
    })
    return this.locations = this.locationsCollection.valueChanges()
  }

  /**
   * Get a location by Zone
   * 
   * @param locationZone The location's zone
   */
  getLocationByZone(locationZone: string) {
    this.locationsCollection = this.afs.collection<Location>('locations', ref => {
      return ref.where('zone', '==', locationZone)
    })
    return this.locations = this.locationsCollection.valueChanges()
  }

  /**
    * Update location document stored on Firestore
    * 
    * @param location The location to update
    */
  updateLocation(location: Location): void {
    this.afs.doc<Location>(`locations/${location.uid}`).update(location)
  }

  /**
   * Delete location data from Firestore
   * 
   * @param location The location to delete
   */
  deleteLocation(location: Location): void {
    this.afs.doc<Location>(`locations/${location.uid}`).delete()
  }

  /**
   * If error, console log and notify user
   * 
   * @param error The error to handle
   */
  private handleError(error) {
    console.error(error)
  }

}
