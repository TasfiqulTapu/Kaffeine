module.exports = (bot) =>{ 
    bot.on("message",(payload,chat)=>{
      const text=payload.message.text.toLowerCase();
        if(text.includes("cookie")){
            chat.sendGenericTemplate([{
              title: "🍪", subtitle: "Cookie!!!!!!", image_url: "https://picsum.photos/400/200",           buttons:[
              { type: 'postback', title: 'Bite!', payload: 'VIEW_MORE' },
            ]}])
        }
    })
}