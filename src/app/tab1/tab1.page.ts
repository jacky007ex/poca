import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  propertyList$ : Observable<any[]>;
  propertyList = new Array<any>();
  firebaseRef = 'propertyList';

  constructor(
    public afd: AngularFireDatabase,
  ) {
    this.getDataFromFireBase();
  }

  getDataFromFireBase(){
    this.propertyList$ = this.afd.list(this.firebaseRef).valueChanges() as Observable<any[]>;
    this.propertyList$.subscribe(
        item => {
          this.propertyList = item;
          console.log(this.propertyList);
        });
  }

}
