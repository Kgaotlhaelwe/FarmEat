import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FarmForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farm-forum',
  templateUrl: 'farm-forum.html',
})
export class FarmForumPage {

  inputquest;

  questionArr = [{question:"How do you deal with weeds? insects? diseases?", answers:[{
              name:"Nthabi", answer:"We do not deworm our cattle or pigs unless they are showing signs of distress. "
            },{
              name:"KB", answer:"For weeds, when we have an area that is growing something we don’t like (thistle, bitter weed, etc.) we make sure that is the area where we drop off our produce for the day. This causes a few things. One, the soil is disturbed by the high impact of cattle as they feed. As the cattle do their thing, they poop, pee, and spill a lot of produce which is then trampled into the ground. The end result is a bare patch that has high concentrations of manure, urine, and organic matter. "
            },{
              name:"Sechaba", answer:"For diseases, you can look at what we did with Benjamin when he was sick. There are multiple posts about what we did to treat him, including showing what drugs we gave him."
            }]},{question:"What kind of fertilizers do you use?", answers:[{
              name:"Sinazo", answer:"We use no commercial fertilizers"
            },{
              name:"MXO", answer:"We use the organic ones"
            },{
              name:"Nthabi", answer:"Our program is all about building soil health, not about applying a band-aid to resolve a problem. If we build the soil health, we don’t need fertilizer. "
            }]},{question:"Do you grow all the products that you sell?", answers:[{
              name:"KB", answer:"Many small farms try to be all things in the beginning"
            },{
              name:"Sechaba", answer:"You get the idea. When I go to a farm and see that there are two of everything, I see a farmer who is running a zoo, not a farm."
            },{
              name:"Sinazo", answer:"There’s nothing wrong with that but as time passes, most farmers will find the animals they work best with and focus on that."
            }]},{question:"How do you decide which products to grow? ", answers:[{
              name:"MXO", answer:"We base it off of demand, and what we can grow sustainably on our farm. I’ve been offered sheep for free which I refused because we didn’t have the carrying capacity on our farm for them and the cows. "
            },{
              name:"Nthabi", answer:"Currently we raise cows, because I like cows and that’s really our main product. "
            },{
              name:"KB", answer:"We also raise pigs because they do well in the woods and about half of our farm is wooded. Otherwise half of our farm would go unused or we’d have to log it. Plus we can turn pigs in about 8 months, vs. 2 years for cows so it’s a quicker turn around on our investment."
            }]},{question:"What type of livestock do you manage?", answers:[{
              name:"Sechaba", answer:"chickens, and bees. The cattle are baldy Angus. "
            },{
              name:"Sinazo", answer:"The pigs are various heritage breeds, mostly Large Black and Chester Whites. We do have Berkshire as well. "
            },{
              name:"MXO", answer:"The bees are Italian honey bees."
            }]}]

  ques = [];
  que2 = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  initializeItems() {
   for (let index = 0; index < this.questionArr.length; index++) {
     this.ques.push(this.questionArr[index].question) 
   }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmForumPage');
  }

  search(){
     // if the value is an empty string don't filter the items
     if (this.inputquest && this.inputquest.trim() != '') {
       console.log(this.ques);
       this.ques = this.ques.filter((item) => {
          return (item.toLowerCase().indexOf(this.inputquest.toLowerCase()) > -1);
           
        })
       // console.log(this.ques);
    }
  }

  question(){

  }



}
