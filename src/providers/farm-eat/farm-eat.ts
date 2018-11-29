import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var firebase

/*
  Generated class for the FarmEatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FarmEatProvider {

  farmArray = new Array() ;
  nearByOrg = new Array();
  newsMessage;
  newFeedArray = new Array();
  condition;

  
  
  constructor(public http: HttpClient , private geolocation :  Geolocation) {
    console.log('Hello FarmEatProvider Provider');
  }

  checkstate(){
    return new Promise((resolve, reject)=>{
    firebase.auth().onAuthStateChanged((user)=>
     {
      if (user != null) {
       // alert('user signed in')
       this.condition = 1
   
      } else {
   
        this.condition = 0
       // alert('no user signed in')
      }
      resolve(this.condition)
    })
 
  })
  }



  createPositionRadius(latitude, longitude){
    var leftposition, rightposition, downposition, uposititon;
    return new Promise ((accpt, rej) =>{
// down  position
var downlat = new String(latitude); 
var latIndex = downlat.indexOf( "." ); 
var down = parseInt(downlat.substr(latIndex + 1,2)) + 6;
var down = parseInt(downlat.substr(latIndex + 1,2)) + 12;
if (down >= 100){
  if (downlat.substr(0,1) == "-"){
    var firstDigits = parseInt(downlat.substr(0,3)) - 1;
  }
  else{
    var firstDigits = parseInt(downlat.substr(0,2)) + 1;
  }
  var remainder = down - 100;
  downposition = firstDigits +  ".0" + down;
}else{
  if (downlat.substr(0,1) == "-"){
    downposition =  downlat.substr(0,3) + "." + down ;
  }
  else{
    downposition = downlat.substr(0,2) + "." + down;
  }
}
//up  position
var uplat = new String(latitude); 
var latIndex = uplat .indexOf( "." ); 
var up= parseInt(uplat .substr(latIndex + 1,2)) - 6;
var up= parseInt(uplat .substr(latIndex + 1,2)) - 12;
if (up <= 0){
  if (uplat.substr(0,1) == "-"){
    var firstDigits = parseInt(uplat.substr(0,3)) + 1;
  }
  else{
    var firstDigits = parseInt(uplat.substr(0,2)) - 1;
  }
  var remainder = up - 100;
  uposititon = firstDigits +  ".0" + remainder;
}else{
  if (uplat.substr(0,1) == "-"){
    uposititon = uplat.substr(0,3) + "." + up ;
  }
  else{
    uposititon = uplat.substr(0,2) + "." + up ;
  }
}
  //left position
 var leftlat = new String(longitude);
 var longIndex =  leftlat.indexOf(".");
 var left =  parseInt(leftlat.substr(longIndex + 1,2)) - 6;
 var left =  parseInt(leftlat.substr(longIndex + 1,2)) - 12;
 if (left <= 0){
   if (leftlat.substr(0,1) == "-"){
      var firstDigits =  parseInt(leftlat.substr(0,3)) - 1;
   }else{
    var firstDigits =  parseInt(leftlat.substr(0,2)) + 1;
   }
   var remainder = left - 100;
   leftposition= firstDigits +  ".0" + remainder;
 }else{
   if (leftlat.substr(0,1) == "-"){
    leftposition = leftlat.substr(0,3) + "." + left;
   }
   else{
    leftposition = leftlat.substr(0,2) + "." + left;
   }

 }
    //right position
    var rightlat = new String(longitude);
    var longIndex =  rightlat.indexOf(".");
    var right =  parseInt(rightlat.substr(longIndex + 1,2)) + 6;
    var right =  parseInt(rightlat.substr(longIndex + 1,2)) + 12;
    if (right >= 100){
      if (rightlat.substr(0,1) == "-"){
         var firstDigits =  parseInt(rightlat.substr(0,3)) - 1;
      }else{
       var firstDigits =  parseInt(rightlat.substr(0,2)) + 1;
      }
      var remainder =  right - 100;
      rightposition = firstDigits +  ".0" + remainder;
    }else{
      rightposition = rightlat.substr(0,2) + "." + right;
    }
    let radius ={
      left: leftposition,
      right : rightposition,
      up : uposititon,
      down : downposition
    }
    accpt(radius);
    })
  }

  getCurrentLocation(){
    //get current location
     return new Promise ((accpt, rej) =>{
     this.geolocation.getCurrentPosition().then((resp) => {
       this.createPositionRadius(resp.coords.latitude, resp.coords.longitude).then((data:any) =>{
         accpt(data);
       })
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      })
   }


   getCurrentLocations(){
    //get current location
     return new Promise ((accpt, rej) =>{
     this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp);
       
    
         accpt(resp);
  
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      })
   }

   getNewsFeed(){

    return new Promise((resolve ,reject)=>{
      firebase.database().ref('Newsfeed').on('value' , (data:any)=>{
        var Newsfeed =data.val();
        var keys:any =Object.keys(Newsfeed);
        for(var i =0 ; i<keys.length;i++){
          var  k =keys[i] ;
          let NewsfeedObj = {
            k:k ,
            title: Newsfeed[k].title,
            message: Newsfeed[k].message,
            image:Newsfeed[k].image,

          }
          this.newFeedArray.push(NewsfeedObj);

          resolve( this.newFeedArray);
        }

      })
    })
   }

  getallFarms(){

    return new Promise((resolve ,reject)=>{
      firebase.database().ref('Farms').on('value',(data:any)=>{
      firebase.database().ref('UrbanFarms').on('value',(data:any)=>{

        var farms =data.val() ;
        console.log(farms);
        var keys:any =Object.keys(farms)
        console.log(keys);

        for(var i =0 ; i <keys.length;i++){
          var  k =keys[i];
          let obj = {
            k:k ,
            lat:farms[k].lat ,
            lng:farms[k].lng ,
            name: farms[k].name ,
            description:farms[k].description ,
            type:farms[k].type ,
            address: farms[k].address ,
            aquatic: farms[k].aquatic ,
            crops:farms[k].crops ,
            tel:farms[k].tel ,
            email: farms[k].email ,
            image:farms[k].image ,
            beeKeeping:farms[k].beeKeeping ,
            liveStock:farms[k].liveStock ,
            facebook:farms[k].facebook
          }
          this.farmArray.push(obj) ;
          resolve(this.farmArray)
        }
      
      })

    })
  })
}


  getNearByOrganizations(radius,org){
    return new Promise((accpt,rej) =>{
      this.getCurrentLocations().then((resp:any) =>{
        console.log(resp);
        
        var lat =  new String(resp.coords.latitude).substr(0,6);
        console.log(lat);
        console.log(resp.coords.latitude)
      
        
        
        var long = new String(resp.coords.longitude).substr(0,5);
        console.log(long);
        console.log(resp.coords.longitude);
        
        
        for (var x = 0; x < org.length; x++){
          var orglat = new String(org[x].lat).substr(0,6);
          var orgLong =  new String(org[x].lng).substr(0,5);
          console.log('out');
          console.log(orglat);
          console.log(orgLong);
          console.log( radius.left);
          console.log(radius.right);
          console.log(radius.down);
          console.log(radius.up);
          
          
          
          
          
          
          
         if ((orgLong  <= long  && orgLong  >= radius.left || orgLong  >= long  && orgLong  <= radius.right) && (orglat >= lat && orglat <= radius.down || orglat <= lat && orglat >= radius.up)){

          console.log('in');
          
          
          this.nearByOrg.push(org[x]);
          console.log(this.nearByOrg);

          }
        }
        accpt(this.nearByOrg)
      })
    })
  }

  
  register(email , password , username){

    return new Promise((resolve, reject)=>{

      firebase.auth().createUserWithEmailAndPassword(email , password) .then(()=>{
        var uid= firebase.auth().currentUser.uid;
        firebase.database().ref("user/"+uid).set({
          username:username,
          email:email,
 
        })

        resolve()
 
      } , (error)=>{
        reject(error);
      });
 
 
 })
 
 }

 login(email , password){

  return new Promise((resolve, reject)=>{
    firebase.auth().signInWithEmailAndPassword(email , password).then(()=>{
      resolve();
    }, Error =>{
      reject(Error)
    }) ;
  
   
})


}

signout(){
  firebase.auth().signOut().then(function() {
  }).catch(function(error) {

  });
}
forgetPassword(email){

  return new Promise((resolve, reject)=>{
    firebase.auth().sendPasswordResetEmail(email) .then(()=> {

      resolve();
    } , (error)=>{
      reject(error)

    })
    

})

}


// newsfeed(){
//   return new Promise((resolve, reject)=>{
//     firebase.database().ref('newsfeed/').on('value', (data: any) => {
 
//       var message = data.val();
//        console.log(data.val());
 
//        var keys: any = Object.keys(message);
 
//        console.log(keys);
 
//        for (var i = 0; i < keys.length; i++){
//         var m = keys[i];
 
//         let obj = {
//           m:keys ,
//           message:message[m].message
 
//         }
//         this.newsMessage.push(obj)
 
//         resolve(this.newsMessage);
//   }
 
 
//   })
 
//  })
 
//  }
}
