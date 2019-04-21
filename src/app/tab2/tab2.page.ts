import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  pageHeader: string = "My groups";
  groups: string[]; 

  constructor(public navCtrl: NavController, public router: Router) {
    this.groups = [
      'group 1',
      'group 2',
      'group 3'
    ];
  }

  openGroup(group) {
    console.log('group clicked:', group);
    // this.navCtrl.navigateForward('/chat');
    this.router.navigate(['/chat', {group: group}]);
  }
}
