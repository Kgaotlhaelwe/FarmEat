import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,Keyboard } from 'ionic-angular';
import { FarmEatProvider } from '../../providers/farm-eat/farm-eat'
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HomePage} from '../home/home'
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
  mypic ;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, private farmEat: FarmEatProvider,private camera: Camera,private keyboard: Keyboard) {
    
  }
  // closeCallback(){
  //   this.Show()
  //   console.log('close');
    
  // }
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

  back(){
   this.navCtrl.pop()
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
                      //this.navCtrl.push(ProfilePage)
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
    if(this.username != ""){
                this.farmEat.editUser(this.username).then(()=>{
                  this.farmEat.getUser().then((data:any)=>{
                    console.log(data);
                    
                    this.username = data.username
                    const toast = this.toastCtrl.create({
                      message: 'Your username was successfully updated.',
                      duration: 3000
                    });
                    
                    toast.present();
                   
                  })
                 
                })
              }else{
                  const toast = this.toastCtrl.create({
                    message: 'You have entered a blank username, please try again.',
                    duration: 3000
                  });
                  
                  toast.present();
              }

  }


  uploadImage(){
    
    const options: CameraOptions = {
     quality: 70,
     destinationType: this.camera.DestinationType.DATA_URL,
     
     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
     saveToPhotoAlbum:false
   }
   
   this.camera.getPicture(options).then((imageData) => {
     let userID = firebase.auth().currentUser.uid;
    this.mypic = 'data:image/jpeg;base64,' + imageData;
    console.log(this.mypic);
 
    firebase.database().ref("user/" + userID).update({
      cover: this.mypic
 
    })
 
 
 this.ionViewWillEnter()
    
   }, (err) => {
   console.log(err);
   
   });
  }



  uploadProfileImage(){

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    
    this.camera.getPicture(options).then((imageData) => {
      let userID = firebase.auth().currentUser.uid;
     this.mypic = 'data:image/jpeg;base64,' + imageData;
     console.log(this.mypic);
  
     firebase.database().ref("user/" + userID).update({
      proPicture: this.mypic
  
     })
  
     
  this.ionViewWillEnter();
     
    }, (err) => {
    console.log(err);
    
    });

  }
  textpad(){}
  
  onKeyboardHide(){
    console.log('hide');
    document.getElementById('pad').style.marginTop="0px"
  }
  // show(){
  //   console.log('show');
  //   document.getElementById('pad').style.marginTop="10px"
  // }
}