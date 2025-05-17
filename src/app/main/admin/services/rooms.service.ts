import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDocs, setDoc, updateDoc, serverTimestamp, getCountFromServer, QuerySnapshot } from '@angular/fire/firestore';
import {
  AngularFirestore, AngularFirestoreCollection, CollectionReference, DocumentChangeAction, DocumentData, DocumentReference, DocumentSnapshot
} from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  public collectionName = 'rooms';
  private itemsCollection!: AngularFirestoreCollection<any>;
  public items!: Observable<any[]>;
  private lastVisible: DocumentSnapshot<any> | null = null;
  private firstVisible: DocumentSnapshot<any> | null = null;
  private totalRecords = 0;
  private cursors: any[] = [null]; // Stores document snapshots for each page [null, page1Cursor, page2Cursor...]
  private currentPage = 0;

  constructor(private firestore: Firestore, private afs: AngularFirestore) { }

  getAllRooms(): Promise<any[]> {
    return getDocs(collection(this.firestore, this.collectionName)).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data())
    })
  }

  deleteRoom(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, `${this.collectionName}/${id}`));
  }

  addRoom(house: any, docId: string): Promise<void> {
    const roomDoc = doc(this.firestore, `${this.collectionName}/${docId}`);
    return setDoc(roomDoc, {
      ...house,
      createdAt: serverTimestamp(),
    });
  }

  updateRoom(room: any, docId: string): Promise<void> {
    const roomDoc = doc(this.firestore, `${this.collectionName}/${docId}`);
    return updateDoc(roomDoc, room);
  }

  // Initialize pagination
  init(collection: string, pageSize: number): Observable<any[]> {
    this.cursors = [null];
    return this.loadPage(collection, pageSize, 0);
  }

  // Main method to load any page
  loadPage(collection: string, pageSize: number, pageNumber: number): Observable<any[]> {
    return this.ensureCursors(collection, pageSize, pageNumber).pipe(
      switchMap(() => {
        this.currentPage = pageNumber;
        const cursor = this.cursors[pageNumber];

        const queryFn = (ref: CollectionReference<DocumentData>) => {
          let query = ref.orderBy('createdAt').limit(pageSize);
          if (cursor) query = query.startAfter(cursor);
          return query;
        };

        return this.afs.collection(collection, queryFn).get().pipe(
          map(snapshot => {
            // Store cursor for next page if we're at the end of known pages
            if (snapshot.docs.length > 0 && pageNumber === this.cursors.length - 1) {
              this.cursors.push(snapshot.docs[snapshot.docs.length - 1]);
            }
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
          })
        );
      })
    );
  }

  // Helper to ensure we have cursors up to requested page
  private ensureCursors(collection: string, pageSize: number, targetPage: number): Observable<void> {
    if (targetPage < this.cursors.length) {
      return of(undefined);
    }

    const pagesToLoad = targetPage - (this.cursors.length - 1);
    const lastCursor = this.cursors[this.cursors.length - 1];

    const queryFn = (ref: CollectionReference<DocumentData>) => {
      let query = ref.orderBy('createdAt').limit(pageSize * pagesToLoad);
      if (lastCursor) query = query.startAfter(lastCursor);
      return query;
    };

    return this.afs.collection(collection, queryFn).get().pipe(
      map(snapshot => {
        // Store cursors for each intermediate page
        for (let i = pageSize - 1; i < snapshot.docs.length; i += pageSize) {
          this.cursors.push(snapshot.docs[i]);
        }
        return undefined;
      })
    );
  }

  // Simple next/previous wrappers
  nextPage(collection: string, pageSize: number): Observable<any[]> {
    return this.loadPage(collection, pageSize, this.currentPage + 1);
  }

  prevPage(collection: string, pageSize: number): Observable<any[]> {
    return this.loadPage(collection, pageSize, Math.max(0, this.currentPage - 1));
  }

  async getTotalCount(): Promise<number> {
    const snapshot = await this.afs.collection('rooms').get().toPromise();
    return snapshot?.size || 0;
  }
}
