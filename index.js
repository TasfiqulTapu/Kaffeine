const BootBot = require('bootbot');
const fs = require('fs')
const bot = new BootBot({
  accessToken: process.env.ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET
});

const messageCommands = fs.readdirSync("./message_commands").filter(file => file.endsWith("js"))
for(const file of messageCommands){
    const command = require(`./message_commands/${file}`)
    bot.module(command)
}

bot.start()
 