import { Component } from '@angular/core';
import { NavController, AlertController  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  pageHeader: string = "邨巴時間";
  groups: string[]; 

  constructor(public alertController: AlertController, public navCtrl: NavController, public router: Router) {
    this.getAllGroups();
  }

  getAllGroups() {
    this.groups = [
      '上源->美孚 Mon 7:30am',
      '上源->美孚 Mon 7:45am',
      '上源->美孚 Mon 8:00am',
      '上源->美孚 Mon 8:15am',
      '上源->美孚 Mon 8:30am',
      '雲匯->大學站 Mon 7:30am',
      '雲匯->大學站 Mon 7:45am',
      '雲匯->大學站 Mon 8:00am',
      '雲匯->大學站 Mon 8:15am',
      '雲匯->大學站 Mon 8:30am',
      '上源->美孚 Tue 7:30am',
      '上源->美孚 Tue 7:45am',
      '上源->美孚 Tue 8:00am',
      '上源->美孚 Tue 8:15am',
      '上源->美孚 Tue 8:30am',
      '雲匯->大學站 Tue 7:30am',
      '雲匯->大學站 Tue 7:45am',
      '雲匯->大學站 Tue 8:00am',
      '雲匯->大學站 Tue 8:15am',
      '雲匯->大學站 Tue 8:30am'      
    ];
  }

  openGroup(group) {
    console.log('group clicked:', group);
    //this.router.navigate(['/chat', {group: group}]);
    this.presentAlertConfirm(group)
  }

  shouldShowCancel: Boolean = true;
  searchbarInput: string;
  searchbarPlaceholder: string = "揾邨巴..."

  onInput(event: any) {
    this.getAllGroups();
    let val = event.target.value;
    console.log("onInput: ",val)
    if (val && val.trim() !== '') {
      this.groups = this.groups.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  onCancel(event: any) {    
    let val = event.target.value;
    console.log("onCancel: ", val)
    if (val && val.trim() !== '') {
      this.getAllGroups();
    } 
  }

  async presentAlertConfirm(group: string) {
    const alert = await this.alertController.create({
      header: '搭呢班車?',
      message: group,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Yes');
            this.router.navigate(['/chat', {group: group}]);
          }
        }
      ]
    });
    await alert.present();
  }
}
