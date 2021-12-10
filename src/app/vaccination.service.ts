import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getObjectById(id) { 
    return this.firestore.collection('collectionName').doc(id).valueChanges()
}

  createRecord(record,collection) {
    return this.firestore.collection(collection).add(record);
  }

  readRecord(collection) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  updateRecord(recordID,record,collection){
    this.firestore.doc(`${collection}/` + recordID).update(record);
  }

  deleteRecord(record_id,collection) {  
    this.firestore.doc(`${collection}/` + record_id).delete();
  }
  
}