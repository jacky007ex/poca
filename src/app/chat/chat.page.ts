import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  group: string;
  constructor(private route: ActivatedRoute) {
    this.group = this.route.snapshot.paramMap.get("group");
    console.log(this.group);
   }

  ngOnInit() {
  }

}
