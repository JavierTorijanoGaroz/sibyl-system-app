import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Equipament } from './equipament.model';

@Injectable({
  providedIn: 'root'
})
export class EquipamentsService {

  private equipamentsCollection: AngularFirestoreCollection<Equipament>
  private equipaments: Observable<Equipament[]>
  private equipamentDoc: AngularFirestoreDocument<Equipament>
  private equipament: Observable<Equipament>

  public selectedEquipament: Equipament = {
    uid: null
  }

  constructor(private afs: AngularFirestore) {
    this.equipamentsCollection = this.afs.collection<Equipament>('equipaments')
    this.equipaments = this.equipamentsCollection.valueChanges()
  }

  /**
  * Add a new equipament document stored on Firestore
  * @param equipament 
  */
  createEquipament(equipament: Equipament) {
    this.afs.collection("equipaments").add(equipament)
      .then(docRef => {
        equipament.uid = docRef.id
        this.updateEquipament(equipament)
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      })
  }

  /**
   * Read all equipament document stored on Firestore
   */
  getAllEquipaments() {
    return this.equipaments = this.equipamentsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Equipament
          data.uid = action.payload.doc.id
          return data
        })
      }))
  }

  /**
   * Get a equipament by UID
   * 
   * @param equipamentUID The equipament's uid
   */
  getEquipamentByUID(equipamentUID: string) {
    this.equipamentsCollection = this.afs.collection<Equipament>('equipaments', ref => {
      return ref.where('uid', '==', equipamentUID)
    })
    return this.equipaments = this.equipamentsCollection.valueChanges()
  }

  /**
   * Get a equipament by Type
   * 
   * @param equipamentType The equipament's type
   */
  getEquipamentByType(equipamentType: string) {
    this.equipamentsCollection = this.afs.collection<Equipament>('equipaments', ref => {
      return ref.where('type', '==', equipamentType)
    })
    return this.equipaments = this.equipamentsCollection.valueChanges()
  }

  /**
   * Get a equipament by Name
   * 
   * @param equipamentName The equipament's name
   */
  getEquipamentByName(equipamentName: string) {
    this.equipamentsCollection = this.afs.collection<Equipament>('equipaments', ref => {
      return ref.where('name', '==', equipamentName)
    })
    return this.equipaments = this.equipamentsCollection.valueChanges()
  }

  /**
   * Get a equipament by Location
   * 
   * @param equipamentLocation The equipament's location
   */
  getEquipamentByLocation(equipamentLocation: string) {
    this.equipamentsCollection = this.afs.collection<Equipament>('equipaments', ref => {
      return ref.where('location', '==', equipamentLocation)
    })
    return this.equipaments = this.equipamentsCollection.valueChanges()
  }

  /**
   * Get a equipament by Status
   * 
   * @param equipamentStatus The equipament's status
   */
  getEquipamentByStatus(equipamentStatus: string) {
    this.equipamentsCollection = this.afs.collection<Equipament>('equipaments', ref => {
      return ref.where('status', '==', equipamentStatus)
    })
    return this.equipaments = this.equipamentsCollection.valueChanges()
  }

  /**
   * Update equipament document stored on Firestore
   * 
   * @param equipament The equipament to update
   */
  updateEquipament(equipament: Equipament): void {
    this.afs.doc<Equipament>(`equipaments/${equipament.uid}`).update(equipament)
  }

  /**
   * Delete equipament data from Firestore
   * 
   * @param equipament The equipament to delete
   */
  deleteEquipament(equipament: Equipament): void {
    this.afs.doc<Equipament>(`equipaments/${equipament.uid}`).delete()
  }

  /**
   * If error, console log and notify user
   * 
   * @param error Error
   */
  private handleError(error) {
    console.error(error)
  }
}
