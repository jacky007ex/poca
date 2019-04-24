import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/logIn';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  userId;
  user;

  constructor(public modalCtrl: ModalController, private afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    });
  }

  async openLogInPage() {
    const modal = await this.modalCtrl.create({
      component: LoginPage
      //componentProps: { value: 123 }
    });
    return await modal.present();
  }

  signOut() {
    this.afAuth.auth.signOut().then(result => {
      this.userId = null;
    });
  }
}
