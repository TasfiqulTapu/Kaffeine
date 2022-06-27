const crypto = require("crypto")
module.exports = (bot) =>{ 
    bot.on('message',(payload, chat)=>{
        if(!payload.message.text.startsWith(process.env.PREFIX)) return;
        chat.sendAction("mark_seen")
        const query = payload.message.text.slice(process.env.PREFIX.length).split(" ")
        if(!query[0]=="gen") return;
        switch(query[1]){
            case "face":
                face(payload,chat,query);
                break;
        }
      
    })}

async function face(payload, chat, query){
    chat.sendAction("typing_on");
    let id = crypto.randomBytes(8).toString('hex')
    let max,min,gender,search;
    gender = query.find(g => g == "male")
    gender = query.find(g => g == "female")
    max = query.find(x=>x.startsWith("max="))
    min = query.find(x=>x.startsWith("min="))
    search = id + "?" + `${gender?"gender=" + gender + "&":""}${min?"minimum_age=" + min.slice(4) + "&":""}${max?"maximum_age=" + max.slice(4) :""}`
  await chat.say({
          attachment: 'image',
          url: `http://fakeface.rest/thumb/view/${search}`
      });
    chat.sendAction("typing_off");
   
}

