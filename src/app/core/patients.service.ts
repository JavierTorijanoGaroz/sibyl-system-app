import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patientsCollection: AngularFirestoreCollection<Patient>
  private patients: Observable<Patient[]>
  private patientDoc: AngularFirestoreDocument<Patient>
  private patient: Observable<Patient>

  public selectedPatient: Patient = {
    uid: null
  }

  constructor(private afs: AngularFirestore) {
    this.patientsCollection = this.afs.collection<Patient>('patients')
    this.patients = this.patientsCollection.valueChanges()
  }

  /**
   * Add a new patient document stored on Firestore
   * @param patient 
   */
  createPatient(patient: Patient) {
    this.afs.collection("patients").add(patient)
      .then(docRef => {
        patient.uid = docRef.id
        this.updatePatient(patient)
        console.log("Document written with ID: ", docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error)
      })
  }

  /**
   * Read all patient document stored on Firestore
   */
  getAllPatients() {
    return this.patients = this.patientsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Patient
          data.uid = action.payload.doc.id
          return data
        })
      }))
  }

  /**
   * Get a patient by UID
   * 
   * @param patientUID The patient's uid number
   */
  getPatientByUID(patientUID: string) {
    this.patientsCollection = this.afs.collection<Patient>('patients', ref => {
      return ref.where('uid', '==', patientUID)
    })
    return this.patients = this.patientsCollection.valueChanges()
  }

  /**
   * Get a patient by DNI 
   * 
   * @param patientDNI The patient's dni number
   */
  getPatientByDNI(patientDNI: string) {
    this.patientsCollection = this.afs.collection<Patient>('patients', ref => {
      return ref.where('dni', '==', patientDNI)
    })
    return this.patients = this.patientsCollection.valueChanges()
  }


  /**
   * Get a patient by CIP 
   * 
   * @param patientCIP The patient's cip number
   */
  getPatientByCIP(patientCIP: string) {
    this.patientsCollection = this.afs.collection<Patient>('patients', ref => {
      return ref.where('cip', '==', patientCIP)
    })
    return this.patients = this.patientsCollection.valueChanges()
  }

  /**
   * Get a patient by Name
   * 
   * @param patientName The patient's name
   */
  getPatientByName(patientName: string) {
    this.patientsCollection = this.afs.collection<Patient>('patients', ref => {
      return ref.where('name', '==', patientName)
    })
    return this.patients = this.patientsCollection.valueChanges()
  }

  /**
   * Get a patient by Lastname
   * 
   * @param patientLastName The patient's lastname
   */
  getPatientByLastName(patientLastName: string) {
    this.patientsCollection = this.afs.collection<Patient>('patients', ref => {
      return ref.where('lastName', '==', patientLastName)
    })
    return this.patients = this.patientsCollection.valueChanges()
  }

  /**
   * Get a patient by Location
   * 
   * @param patientLocation The patient's location
   */
  getPatientByLocation(patientLocation: string) {
    this.patientsCollection = this.afs.collection<Patient>('patients', ref => {
      return ref.where('location', '==', patientLocation)
    })
    return this.patients = this.patientsCollection.valueChanges()
  }

  /**
   * Get a patient by Status
   * 
   * @param patientStatus The patient's status
   */
  getPatientByStatus(patientStatus: string) {
    this.patientsCollection = this.afs.collection<Patient>('patients', ref => {
      return ref.where('status', '==', patientStatus)
    })
    return this.patients = this.patientsCollection.valueChanges()
  }

  /**
   * Update patient document stored on Firestore
   * 
   * @param patient The patient to update
   */
  updatePatient(patient: Patient): void {
    this.afs.doc<Patient>(`patients/${patient.uid}`).update(patient)
  }

  /**
   * Delete patient data from Firestore
   * 
   * @param patient The patient to delete
   */
  deletePatient(patient: Patient): void {
    this.afs.doc<Patient>(`patients/${patient.uid}`).delete()
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
