import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  allPosts = [];

  constructor(private data: DataService, private shared: SharedService) {}

  ionViewDidEnter(){
    this.data.getAllPosts().subscribe(list => {

      // filter
      // to everyone, from you, to you.
      list= list.filter(p => p.to =='Everyone' || p.from == this.shared.userName || p.to == this.shared.userName);

      // tslint:disable-next-line: only-arrow-functions
      this.allPosts = list.sort(function(a, b){
        if(a.timeStamp > b.timeStamp){
          return -1;
        }else{
          return 1;
        }
      });
    });
  }

  // inject data service
  // get data from service
  // put array into global var
  // access var form ngfor on html.
  // display text from messages
}
