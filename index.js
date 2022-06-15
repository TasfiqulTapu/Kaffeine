const BootBot = require('bootbot');
const crypto = require("crypto")
console.log("Starting bot at " + new Date().toLocaleString('en-GB', {timeZone: 'Asia/Dhaka',year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}))
// const express = require("express");
// const app = express();
// app.use(express.static("public"));
// app.get("/", (request, response) => {
//   response.redirect("/index.html");
// });
// const listener = app.listen(8080, () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });

const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET
});
 
bot.on('message', async (payload, chat) => {
  console.log(payload);
  chat.sendAction("mark_seen");
  const text = payload.message.text;
  if(text.startsWith("/ss")){
    let url= text.slice("/ss".length).trim().split(" ");
    chat.sendAction("typing_on");
     await chat.say({
          attachment: 'image',
          url: `http://image.thum.io/get/wait/2/http://${url[0]}`
      });
    chat.sendAction("typing_off");
}
 if(text.startsWith("/gen face")){
    chat.sendAction("typing_on");
    let id = crypto.randomBytes(8).toString('hex')
    let query = text.slice("/gen face".length).trim().split(" ");
   let max,min,gender,search;
if(text.toLowerCase().includes(" male")) gender = "male";
if(text.toLowerCase().includes(" female")) gender = "female";

max = query.find(x=>x.startsWith("max="))
min = query.find(x=>x.startsWith("min="))
search = id + "?" + `${gender?"gender=" + gender + "&":""}${min?"minimum_age=" + min.slice(4) + "&":""}${max?"maximum_age=" + max.slice(4) :""}`
  await chat.say({
          attachment: 'image',
          url: `http://fakeface.rest/thumb/view/${search}`
      });
    chat.sendAction("typing_off");
  }
  if(text.startsWith("/gen cat")){
    chat.sendAction("typing_on");
  await chat.say({
          attachment: 'image',
          url: `http://thiscatdoesnotexist.com`
      });
    chat.sendAction("typing_off");
  }
  if(text.startsWith("/gen horse")){
    chat.sendAction("typing_on");
  await chat.say({
          attachment: 'image',
          url: `http://thishorsedoesnotexist.com`
      });
    chat.sendAction("typing_off");
  }
  if(text.startsWith("cookie")){
    let buttons = [
           {
            "title":"Cookie 🍪!",
            "image_url":"https://picsum.photos/200",
            "subtitle":"Wanna eat the cookie?",
           
            "buttons":[
{
                "type":"postback",
                "title":"Bite!",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]
           }]
  chat.sendGenericTemplate(buttons)
  }
});

bot.on("postback:DEVELOPER_DEFINED_PAYLOAD", (payload,chat)=>{
chat.say("Heard ya!")
})
  
bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
  chat.say('Hey', { typing: true });
});

bot.hear([/(good)?bye/i, /see (ya|you)/i, 'adios'], (payload, chat) => {
  let replies = ["Bye!!", "Sayonara", "Adios", "See you later"]
    chat.say(replies[Math.floor(Math.random()*replies.length)]);
});

bot.start();