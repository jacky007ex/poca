import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/logIn';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  userId;
  user;

  constructor(public modalCtrl: ModalController) {}

  async openLogInPage() {
    const modal = await this.modalCtrl.create({
      component: LoginPage
      //componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
