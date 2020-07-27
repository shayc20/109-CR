import { Friend } from './../models/friend';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  allPosts: Observable<Post[]>;
  allFriends: Observable<Friend[]>;


  postCollection: AngularFirestoreCollection<Post>;
  friendCollection: AngularFirestoreCollection<Friend>;

  constructor(private fst: AngularFirestore) {
    this.postCollection = fst.collection<Post>('posts');
    this.friendCollection = fst.collection<Friend>('friends')
   }

   private retrivePosts(){
     this.allPosts = this.postCollection.snapshotChanges().pipe(
       map(actions => {
         return actions.map(p => {
           const data = p.payload.doc.data();
           const badDate: any = data.timeStamp || data.timestamp;
           data.timeStamp = new firestore.Timestamp(badDate.seconds, badDate.nanoseconds).toDate();
           return{...data};
         });
       })
     );
   }

   private retriveFriends(){
     this.allFriends = this.friendCollection.valueChanges();
   }

  sendPost(post){
    // tslint:disable-next-line: prefer-const
    let item = Object.assign({}, post);
    this.postCollection.add(item);
  }

  saveFriend(friend){
    const item = Object.assign({}, friend);
    this.friendCollection.add(item);
  }

  getAllPosts(){
    this.retrivePosts();
    return this.allPosts;
  }

  getAllFriends(){
    this.retriveFriends();
    return this.allFriends;
  }
}
