module.exports = (bot) =>{ 
    bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
        let replies = ["Hey!!", "Konnichiwa", "Hello", "Hola", "Bye" ]
        chat.say(replies[Math.floor(Math.random()*replies.length)], { typing: true });
});

} 

