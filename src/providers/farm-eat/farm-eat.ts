import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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
  newSeachedFarms = new Array() ;
  condition;
  userID
  username
  userPic
  lat = -26.2485;
  lng = 27.8540;
  comments = []
  
  constructor(public http: HttpClient , private geolocation :  Geolocation, public events: Events, public alertCtrl: AlertController, private zone:NgZone) {
    console.log('Hello FarmEatProvider Provider');
    
    //this.currentLocation()
  }

  // currentLocation(){
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     var userLoc = resp;
  //     console.log(userLoc);
      
  //   })
  // }
  checkstate(){
    return new Promise((resolve, reject)=>{
      this.zone.run(()=>{
        firebase.auth().onAuthStateChanged((user)=>
        {
         if (user != null) {
          // alert('user signed in')
          this.condition = 1
          console.log(user.uid);
          this.userID = user.uid
          this.events.publish('user:created', this.userID, Date.now());
   
          this.getUser().then((data:any)=>{
           console.log(data);
           this.username = data.username
           this.userPic = data.proPicture
           console.log(this.username);
           
          })
         } else {
      
           this.condition = 0
          // alert('no user signed in')
         }
         resolve(this.condition)
       })
      })
  })
  }



  createPositionRadius(latitude, longitude){
    var leftposition, rightposition, downposition, uposititon;
    return new Promise ((accpt, rej) =>{
      this.zone.run(()=>{
        var downlat = new String(latitude); 
        var latIndex = downlat.indexOf( "." ); 
        var down = parseInt(downlat.substr(latIndex + 1,2)) + 6;
        var down = parseInt(downlat.substr(latIndex + 1,2)) + 12;
        if (down >= 100){
          if (downlat.substr(0,1) == "-"){
            var firstDigits = parseInt(downlat.substr(0,3)) + 1;
          }
          else{
            var firstDigits = parseInt(downlat.substr(0,2)) - 1;
          }
          var remainder = down - 100;
          if (remainder >= 10){
            downposition = firstDigits + "." + remainder;
          }
          else{
            downposition = firstDigits +  ".0" + remainder;
          }
          
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
          var remainder = down - 100;
          if (remainder >= 10){
            uposititon = firstDigits + "." + remainder;
          }
          else{
            uposititon = firstDigits +  ".0" + remainder;
          }
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
         if (left >= 100){
           if (leftlat.substr(0,1) == "-"){
              var firstDigits =  parseInt(leftlat.substr(0,3)) - 1;
           }else{
            var firstDigits =  parseInt(leftlat.substr(0,2)) + 1;
           }
           var remainder = left - 100;
           leftposition= firstDigits +  ".0" + remainder;
         }else{
           if (leftlat.substr(0,1) == "-"){
            var firstDigits= parseInt(leftlat.substr(0,3)) + 1;
           }
           else{
            var firstDigits= parseInt(leftlat.substr(0,2)) - 1;
           }
          
           if (left == 0){
            var remainder = 0;
           }
           else{
            var remainder = left - 12;
           }
           
           leftposition = firstDigits +  ".0" + remainder;
        
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
              if (left == 0){
                var remainder = 0;
               }
               else{
                var remainder = left - 12;
               }
               
               rightposition  = firstDigits +  ".0" + remainder;
            }
        
        
            let radius ={
              left: leftposition,
              right : rightposition,
              up : uposititon,
              down : downposition
            }

            accpt(radius);
      })
// down  position

   
    })
  }

  getCurrentLocation(lat, lng){
    //get current location
     return new Promise ((accpt, rej) =>{
      this.zone.run(()=>{
        console.log("provider outside getCurPos");
        this.createPositionRadius(lat, lng).then((data:any) =>{
         accpt(data);
       })
      })
      

      })
   }


   getCurrentLocations(){
    //get current location
     return new Promise ((accpt, rej) =>{
      this.zone.run(()=>{
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log(resp);
          
       
            accpt(resp);
     
           }).catch((error) => {
             console.log('Error getting location', error.message);
             
           });
      })
    
      })
   }



  


getSearchbyFarms(lat , lng){

  return new Promise((accpt ,rej)=>{
    this.zone.run(()=>{
      this.createPositionRadius(lat , lng).then((data:any)=>{
        accpt(data)
      
      }).catch((error)=>{
        console.log('Error getting location', error);
        
      })
    })
  })
}


   

   getNewsFeed(){

    return new Promise((resolve ,reject)=>{

      this.zone.run(()=>{
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
   
    })
   }

//   getallFarms(){

//     return new Promise((resolve ,reject)=>{
//       firebase.database().ref('Farms').on('value',(data:any)=>{
//       firebase.database().ref('UrbanFarms').on('value',(data:any)=>{

//         var farms =data.val() ;
//         console.log(farms);
//         var keys:any =Object.keys(farms)
//         console.log(keys);
//         this.farmArray =[]
//         for(var i =0 ; i <keys.length;i++){
//           var  k =keys[i];
//           let obj = {
//             k:k ,
//             lat:farms[k].lat ,
//             lng:farms[k].lng ,
//             name: farms[k].name ,
//             description:farms[k].description ,
//             type:farms[k].type ,
//             address: farms[k].address ,
//             aquatic: farms[k].aquatic ,
//             crops:farms[k].crops ,
//             tel:farms[k].tel ,
//             email: farms[k].email ,
//             image:farms[k].image ,
//             beeKeeping:farms[k].beeKeeping ,
//             liveStock:farms[k].liveStock ,
//             facebook:farms[k].facebook
//           }
//           this.farmArray.push(obj) ;
//           resolve(this.farmArray)
//         }
      
//       })

//     })
//   })
// }




getallFarms(){

  return new Promise((resolve ,reject)=>{
    this.zone.run(()=>{
      firebase.database().ref('Farms').on('value',(data:any)=>{
        firebase.database().ref('UrbanFarmz').on('value',(data2:any)=>{
    
          var farms =data.val() ;
          var farms2 =data2.val();
          console.log(farms);
          console.log(farms2)
          var keys:any =Object.keys(farms2)
          
    
          this.farmArray.length = 0;
          console.log(keys);
          for(var i =0 ; i <keys.length;i++){
            var  k =keys[i];
            var y  = 'UrbanFarmz/' + k;
            var FarmDetails;
            firebase.database().ref(y).on('value', (data3:any)=>{
              FarmDetails = data3.val();
              console.log(FarmDetails);
    
              var keys3 = Object.keys(FarmDetails)
              console.log(keys3)
               for(var a = 0 ;a < keys3.length;a++){
                 var k3 = keys3[a];
                 console.log(k3)
    
                 let obj = {
    
                  k:k3 ,
                  userK: k,
                  lat:FarmDetails[k3].lat ,
                  lng:FarmDetails[k3].lng ,
                  name: FarmDetails[k3].name ,
                  description:FarmDetails[k3].description ,
                  type:FarmDetails[k3].type ,
                  address: FarmDetails[k3].address ,
                  aquatic: FarmDetails[k3].aquatic ,
                  crops:FarmDetails[k3].crops ,
                  tel:FarmDetails[k3].tel ,
                  email: FarmDetails[k3].email ,
                  image:FarmDetails[k3].image ,
                  beeKeeping:FarmDetails[k3].beeKeeping ,
                  liveStock:FarmDetails[k3].liveStock ,
                  facebook:FarmDetails[k3].facebook,
                  products:FarmDetails[k3].products,
                  farmRate: FarmDetails[k3].farmRate
                }
                this.farmArray.push(obj)
                console.log(this.farmArray)
               }
            })
              console.log(FarmDetails)
    
    
    
             ;
            resolve(this.farmArray)
          }
        })
    
      })
    })
    
})
}


  getNearByOrganizations(radius,org){
    return new Promise((accpt,rej) =>{
      this.zone.run(()=>{
        this.nearByOrg = []
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
          // console.log('out');
          // console.log(orglat);
          // console.log(orgLong);
          // console.log( radius.left);
          // console.log(radius.right);
          // console.log(radius.down);
          // console.log(radius.up);
          
          
          if ((orgLong  <= long  && orgLong  >= radius.left || orgLong  >= long  && orgLong  <= radius.right) && (orglat >= lat && orglat <= radius.down || orglat <= lat && orglat >= radius.up)){

         this.nearByOrg.push(org[x]);
          console.log(this.nearByOrg);

          }
        }
        accpt(this.nearByOrg)
      })
      })
      
    })
  }


  getSearchedFarm(lat , lng , radius , org){
    return new  Promise((accpt , rej)=>{
      this.zone.run(()=>{
        this.newSeachedFarms = []
        this.getSearchbyFarms(lat , lng).then((resp)=>{
          var lt =  new String(lat).substr(0,6);
          var long =  new String(lng).substr(0,5);
          console.log(lt);
         
          console.log(radius);
          
          console.log(lt);
            console.log(long);
          for (let x = 0; x< org.length/2; x++) {
            
  
            var orglat = new String(org[x].lat).substr(0,6);
            var orgLong =  new String(org[x].lng).substr(0,5);
  
            
      if ((orgLong  <= long  && orgLong  >= radius.left || orgLong  >= long  && orgLong  <= radius.right) && (orglat >= lt && orglat <= radius.down || orglat <= lt && orglat >= radius.up)){
  
  
              this.newSeachedFarms.push(org[x]);
               console.log(this.nearByOrg);
     
               }
            
          }
  
          accpt( this.newSeachedFarms)
        })
      })
      
    })
  }
        


 register(email, password, username) {
  return new Promise((resolve, reject) => {
    this.zone.run(()=>{
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        //tslint:disable-next-line:prefer-const
        let uid: any = firebase.auth().currentUser.uid;
        firebase.database().ref('user/'+uid).set({
          username:username,
          email: email,
          cover: "../../assets/imgs/cover.jpg",
          proPicture: "../../assets/imgs/default-profile-picture1-744x744.jpg"
        });
  
        // tslint:disable-next-line:prefer-const
         let user = firebase.auth().currentUser;
  
        user.sendEmailVerification().then(function(a) {
          console.log(a);
          
        
        }).catch(function(error) {
        // An error happened.
        });
  
  
        resolve();
  
      }, (error) => {
        reject(error);
      });
    })



  });
}

 login(email , password){

  return new Promise((resolve, reject)=>{
    this.zone.run(()=>{
      firebase.auth().signInWithEmailAndPassword(email , password).then(()=>{
        resolve();
      }, Error =>{
        reject(Error)
      }) ;
    })
  
  
   
})


}

signout(){
  return new Promise((resolve, reject)=>{ 
    this.zone.run(()=>{
      firebase.auth().signOut().then(function() {
        resolve()
      }).catch(function(error) {
    
      });
    })
    
  })

}
forgetPassword(email){

  return new Promise((resolve, reject)=>{
    this.zone.run(()=>{
      firebase.auth().sendPasswordResetEmail(email) .then(()=> {

        resolve();
      } , (error)=>{
        reject(error)
  
      })
    })
   
    

})

}

addFarm(name, address,farmType, description, crops, liveStock, beeKeeping, aquatic, email, tel, website, facebook, downloadURL, lat, lng){
    
  return new Promise((resolve, reject)=>{
    this.zone.run(()=>{
      firebase.database().ref("UrbanFarms").push({
        lat: lat,
        lng: lng,
        name: name,
        address: address,
        type: farmType,
        description: description,
        crops: crops,
        liveStock: liveStock,
        beeKeeping: beeKeeping,
        aquatic: aquatic,
        email: email,
        tel: tel,
        website: website,
        facebook: facebook,
        image: downloadURL
      })
    resolve();
    })
    
  })
  
}

editUser(username){
  return new Promise ((accpt, rej) =>{
    this.zone.run(()=>{
      let uid= firebase.auth().currentUser.uid;
      var updates = {
        username: username
      }
     
        firebase.database().ref("user/"+uid).update(updates)
        accpt()
    })
   
  })
}
getUser(){
  return new Promise ((accpt, rej) =>{
    // let uid= firebase.auth().currentUser.uid;
    this.zone.run(()=>{
      console.log(this.userID);
      firebase.database().ref('user/'+this.userID).on('value' , (data:any)=>{
        var user =data.val();
        console.log(user);
        accpt(user)
       
      })
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


getComments(key){
  return new Promise ((resolve, reject) =>{
    this.zone.run(()=>{
      firebase.database().ref("Comments/"+key).on('value' , (data:any)=>{
        var comments =data.val();
        var keys: any = Object.keys(comments);
        this.comments = []
          
         for (var i = 0; i < keys.length; i++){
          var m = keys[i];
   
          let obj = {
            m:keys ,
            message:comments[m].comment,
            date: comments[m].date,
            name: comments[m].name,
            userPic: this.userPic
          }
          this.comments.push(obj)
   
        }
          
        console.log(this.comments);
        resolve(this.comments)
       
      })
    })
    
  })
}

// rate(farmKey, rate){
//   return new Promise((resolve, reject)=>{
//     firebase.database().ref("FarmRates/"+farmKey+"/"+this.userID).set({
//       userRate: rate
//     })
//   resolve();
//   })
// }



rate(farmKey, rate, userK){
  return new Promise((resolve, reject)=>{
    this.zone.run(()=>{
      firebase.database().ref("FarmRates/"+farmKey+"/"+this.userID).set({
        userRate: rate
      }).then(()=>{
      console.log("after");
      
        firebase.database().ref("FarmRates/"+farmKey).on('value' , (data:any)=>{
          var FarmRAtes =data.val();
          var keys: any = Object.keys(FarmRAtes);
  
          var totalRate = 0
       
          for (var i = 0; i < keys.length; i++){
            var m = keys[i];
            totalRate += FarmRAtes[m].userRate
            console.log(FarmRAtes[m].userRate);
            
          }
  
          console.log(totalRate);
          
          var avg = totalRate / keys.length
          console.log(avg);
          
          var updates = {
            farmRate: avg
          }
          firebase.database().ref("UrbanFarmz/"+userK+"/"+farmKey).update(updates)
        })
      })
    resolve();
    })
    
  })
}


getRate(farmKey){
  return new Promise ((resolve, reject) =>{
    this.zone.run(()=>{
      firebase.database().ref("FarmRates/"+farmKey).on('value' , (data:any)=>{
        var FarmRAtes =data.val();
        if(FarmRAtes != undefined || FarmRAtes != null){
          
        //var FarmRAtes =data.val();
        //console.log(FarmRAtes);
        
        var keys: any = Object.keys(FarmRAtes);
        //console.log(keys);
        
        var totalRate = 0
       
          for (var i = 0; i < keys.length; i++){
            var m = keys[i];
            totalRate += FarmRAtes[m].userRate
            console.log(FarmRAtes[m].userRate);
            
          }
    
          var avg =  Math.round(totalRate / keys.length); 
         
            
          //console.log(avg);
          resolve(avg)
        }
          
      }).catch((error)=>{
        console.log("some error happend");
        
        
      })
      reject()
    })
    
  })
}

addComments(key, comment, comDate){
  return new Promise((resolve, reject)=>{
    this.zone.run(()=>{
      this.getUser().then((data:any)=>{
        firebase.database().ref("Comments/"+key).push({
          comment: comment,
          name: data.username,
          date: comDate,
        })
      })
      
    resolve();
    })
   
  })
}

getFarmView(farmK){
  return new Promise ((resolve, reject) =>{
    this.zone.run(()=>{
      firebase.database().ref("FarmViews/"+farmK).on('value' , (data:any)=>{
        var FarmViews =data.val();
        console.log(FarmViews);
        var views = 0
        var keys: any = Object.keys(FarmViews);
        for (let index = 0; index < keys.length; index++) {
          var v = keys[index];
          
          console.log(keys[index]);
         
          const element = FarmViews[v].view;
          console.log(element);
          
          views += element
        }
        resolve(views)
      })
    })
    
  })
 }
 
 
 farmView(farmK){
  return new Promise ((resolve, reject) =>{
    this.zone.run(()=>{
      firebase.database().ref("FarmViews/"+farmK+"/"+this.userID).set({
        view:1
      })
      resolve()
    })
    
  })
 
 }

 gettingGeoStats(lat, lng){
  return new Promise ((resolve, reject) =>{
    this.zone.run(()=>{
      var counter = 0
      this.getallFarms().then((data:any)=>{
       for (let index = 0; index < data.length; index++) {
         var farmLat = data[index].lat
         var farmLng = data[index].lng
         if(lat <= farmLat && lng <= farmLng){
           counter += 1
         }
         
       }
       resolve(counter)
      })
    })
   
  })
 
 }

 userViewedType(farmType, farmK){
  return new Promise ((resolve, reject) =>{
    this.zone.run(()=>{
      firebase.database().ref("UserViewedType/"+farmType+"/"+this.userID).set({
        view:1
      })
    })
   
  })
 }




}
