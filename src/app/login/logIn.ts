import { Component } from '@angular/core';
import { Platform, NavParams, ModalController, Events, LoadingController, AlertController} from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
// import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'page-login',
    templateUrl: 'logIn.html',
    styleUrls: ['logIn.scss']
  })
  
export class LoginPage {
    searchObj;
    user: Observable<firebase.User>;
    userId;
    userObj;
    actionType; 
    loader;

    constructor(
        private afAuth: AngularFireAuth, 
        private facebook: Facebook,
        public platform: Platform,
        public params: NavParams,
        public events: Events,
        public modalCtrl: ModalController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        //private fb: FormBuilder
    ) {
        this.actionType = "signIn";
        this.user = this.afAuth.authState;
        this.afAuth.auth.onAuthStateChanged(user => {
          if (user) {
            this.userId = user.uid;
            events.publish('login-success');
            this.dismiss();
          } else {
            this.userId = null;
          }
        });
    }

    ngOnInit(): void {
      //this.buildForm();
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    async facebookLogin(): Promise<any> {
      try {
        //const response = await this.facebook.login(['email']);
        this.facebook.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => {
            console.log('Logged into Facebook!', JSON.stringify(res));
            const facebookCredential = firebase.auth.FacebookAuthProvider
              .credential(res.authResponse.accessToken);
            //this.loading();
            this.afAuth.auth.signInAndRetrieveDataWithCredential(facebookCredential)
              .then(success => {
                if(success!=null && success.user!=null && success.user.uid!=null && success.user.uid!=""){
                  this.createFirebaseUserObject(success.user.uid, success.user.displayName, success.user.photoURL, 
                    success.user.displayName, success.user.email);
                }else{
                  this.doAlert("Facebook Login Fail");
                }
              });
        })
        .catch(e => console.log('Error logging into Facebook', e));
      }
      catch (error) {
        console.log(error);
      }
    }
    
    signOut() {
      this.afAuth.auth.signOut();
    }

    onSegmentChanged(segmentButton: any) {
      
    }

    //userForm: FormGroup;
    newUser: boolean = true; // to toggle login or signup form
    passReset: boolean = false;

  //   buildForm(): void {
  //     this.userForm = this.fb.group({
  //       'email': ['', [
  //           Validators.required,
  //           Validators.email
  //         ]
  //       ],
  //       'password': ['', [
  //         Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
  //         Validators.minLength(6),
  //         Validators.maxLength(12)
  //       ]
  //     ],
  //     });
 
  //     this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
  //     this.onValueChanged(); // reset validation messages
  //   }

  //   // Updates validation state on form changes.
  //  onValueChanged(data?: any) {
  //   if (!this.userForm) { return; }
  //   const form = this.userForm;
  //   for (const field in this.formErrors) {
  //     // clear previous error message (if any)
  //     this.formErrors[field] = '';
  //     const control = form.get(field);
  //     if (control && control.dirty && !control.valid) {
  //       const messages = this.validationMessages[field];
  //       for (const key in control.errors) {
  //         this.formErrors[field] += messages[key] + ' ';
  //       }
  //     }
  //   }
  // }

 formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'email':         'Email must be a valid email'
    },
    'password': {
      'required':      'Password is required.',
      'pattern':       'Password must be include at one letter and one number.',
      'minlength':     'Password must be at least 6',
      'maxlength':     'Password cannot be more than 12',
    }
  };
  loginEmail;
  loginPw;
  signup(){
    // console.log(this.userForm.value);
    // this.loading();
    //  this.afAuth.auth.createUserWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password)
    //  .then(
    //    success => {
    //      this.createFirebaseUserObject(success.user.uid, "", "", 
    //      this.userForm.value.email, this.userForm.value.email);
    //    } 
    //   )
    //  .catch(error => {
    //     this.loader.dismiss();
    //     this.doAlert(error.message);
    //   });
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginEmail,this.loginPw).then(
      success => {
       console.log("Login Success");
      } 
     )
    .catch(error => {
       this.doAlert(error.message);
     });
   } 
  
  doAlert(message) {
    let alert = this.alertCtrl.create({
      //title: 'Fail to Create',
      //subTitle: message,
      buttons: ['Ok']
    });

    //alert.present();
  }

  createFirebaseUserObject(uid: String, displayName:String, imgUrl:String, 
    username: String, email: String){
      firebase.database().ref("users/" + uid).update(
        {
          username: username,
          email: email,
          display: displayName,
          imgUrl: imgUrl
        }
      ).then(val=>{
          //this.loader.dismiss();
        }
      );
  }

  loading() {
    this.loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        //content: '',
        showBackdrop: false,
       // dismissOnPageChange: true
    });
    this.loader.present();
  }
}
  