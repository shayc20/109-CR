import { Friend } from './../models/friend';
import { Post } from './../models/post';
import { Component } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  model = new Post();
  myFriends : Friend[] = [];

  constructor(private shared: SharedService, private data: DataService) {
    this.data.getAllFriends().subscribe(list =>{
      this.myFriends = list.filter(f => f.friendOf == shared.userName);
    })
  }

  sendPost(){
    this.model.from = this.shared.userName;
    this.data.sendPost(this.model);
    console.log('Posting', this.model);
    this.model = new Post();
  }

}
