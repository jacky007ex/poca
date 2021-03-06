import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from "@ionic/angular";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('scrollArea') content: IonContent;
  
  group: string
  messages: Message[] = []
  nickname: string = 'me'
  message: string = ''
  
  constructor(/*private navCtrl: NavController,*/ private route: ActivatedRoute) {
    this.group = this.route.snapshot.paramMap.get("group")
    console.log(this.group)
   }

  ngOnInit() {
    this.messages.push({ from: 'group-user-1', created: '2019-01-02 03:04:05', text: "hihi", type: "incoming"})
    this.messages.push({ from: 'me', created: '2019-02-02 03:04:05', text: "hihi2", type: "outgoing"})
    this.messages.push({ from: 'group-user-2', created: '2019-03-02 03:04:05', text: "hihi3", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:06', text: "hihi4", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:07', text: "wawawa", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:08', text: "aaaaaa", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:09', text: "this is goat", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:10', text: "this is goat2", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:11', text: "this is goat", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:12', text: "this is goat2", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:13', text: "this is goat", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:15', text: "this is goat2", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:16', text: "this is goat", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:04:18', text: "this is goat2", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:05:05', text: "this is goat", type: "incoming"})
    this.messages.push({ from: 'group-user-3', created: '2019-04-02 03:06:05', text: "this is goat2", type: "incoming"})
    this.messages.push({ from: 'me', created: '2019-04-02 03:07:05', text: "this is goat2", type: "outgoing"})
  }

  sendMessage() {
    if (this.message == null || this.message.trim() === '') {
      console.log("message is empty.")
    } else {
      this.messages.push({ from: 'me', created: Date.now().toString(), text: this.message, type: "outgoing"})
    }    
    this.message = ''
    this.scrollToBottom();
  }

  getClasses(messageType: string) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  scrollToBottom() {
    // this.content.scrollToBottom(1500);
    // console.log("scroll to bottom.")
    setTimeout(()=>{      
      if (this.content.scrollToBottom) {
        console.log("scroll to bottom.")
        this.content.scrollToBottom();
      }
    }, 1000);
  }

  logScrollStart() {
    console.log("logScrollStart : When Scroll Starts");
  }
 
  logScrolling(event: any) {
    console.log("logScrolling : When Scrolling");
  }
 
  logScrollEnd() {
    console.log("logScrollEnd : When Scroll Ends");
  }  
}

interface Message {
  from: string;
  created: string;
  text: string;
  type: string;
}
