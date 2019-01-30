import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat'
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var firebase;

 
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  username:string ;
  
  email:string;
  coverUrl ;
  propicUrl;
  urlCover;
  urlPropic;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, private farmEat: FarmEatProvider) {
      
  }
  ionViewWillEnter(){
    this.farmEat.getUser().then((data:any)=>{
      console.log(data);
      
      this.username = data.username
      this.email = data.email
      this.coverUrl = data.cover
      this.propicUrl = data.proPicture
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  uploadCover(event: any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.urlCover = event.target.files[0];
      reader.onload = (event: any) => {
        this.coverUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      let selectedfile = event.target.files[0];
      let filename = selectedfile.name;
     
    
 
      let storageRef = firebase.storage().ref("cover/" + filename);
 
      let metadata = { contentType: "image/jpeg", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);
 
     
      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          alert(error);
        },
        function () {
          // Handle successful uploads on complete
 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;
                let obj = {
                  cover: downloadURL
                };
 
                firebase
                  .database()
                  .ref("user/" + userID)
                  .update({
                    cover: downloadURL
                  },(error)=>{
                    if (error) {
                      // The write failed...
                      const toast = this.toastCtrl.create({
                        message: 'Your cover picture was not added successfully, please try again.',
                        duration: 3000
                      });
                      toast.present();
                    } else {
                      // Data saved successfully!
                      this.navCtrl.push(ProfilePage)
                      // const toast = this.toastCtrl.create({
                      //   message: 'Your cover picture was added successfully',
                      //   duration: 3000
                      // });
                      // toast.present();
                    }
                  });
 
                  
              } else {
                console.log("User has not sign in");
              }
            });
            
          });
        }
      );
 
      }
  }
  uploadProPic(event: any) {
    console.log("uploasProPic Click");
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.propicUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);0
      let selectedfile = event.target.files[0];
      let filename = selectedfile.name;
     
    
 
      let storageRef = firebase.storage().ref("cover/" + filename);
 
      let metadata = { contentType: "image/jpeg", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);
 
     
      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          alert(error);
        },
        function () {
          // Handle successful uploads on complete
 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
 
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;
                let obj = {
                  cover: downloadURL
                };
 
                firebase
                  .database()
                  .ref("user/" + userID)
                  .update({
                    proPicture: downloadURL
                  },(error)=>{
                    if (error) {
                      // The write failed...
                      const toast = this.toastCtrl.create({
                        message: 'Your profile picture was not added successfully, please try again.',
                        duration: 3000
                      });
                      toast.present();
                    } else {
                      // Data saved successfully!
                      this.navCtrl.push(ProfilePage)
                      // const toast = this.toastCtrl.create({
                      //   message: 'Your profile picture was added successfully',
                      //   duration: 3000
                      // });
                      // toast.present();
                    }
                  });
 
                console.log(userID);
              } else {
                console.log("User has not sign in");
              }
            });
          });
        }
      );
 
      }
  }
  editProfile(){
    const prompt = this.alertCtrl.create({
      title: 'Edit your details',
      message: "Edit your information",
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log(data.username);
            
            if(data.username != ""){
              this.farmEat.editUser(data.username).then(()=>{
                // const toast = this.toastCtrl.create({
                //   message: 'Your details were added successfully',
                //   duration: 3000
                // });
                this.farmEat.getUser().then((data:any)=>{
                  console.log(data);
                  
                  this.username = data.username
                 
                })
                // toast.present();
               
              })
            }else{
                const toast = this.toastCtrl.create({
                  message: 'You have entered a blank username, please try again.',
                  duration: 3000
                });
                
                toast.present();
            }
           
          }
        }
      ]
    });
    prompt.present();
  }
}