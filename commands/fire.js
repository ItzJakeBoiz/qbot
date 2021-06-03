// CONFIGS
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request')
var real = require("twitch-realtime")
var realtime = new real({defaultTopics:["video-playback.cluelesslexx"]});
var live = 0
var streammessage = null
var testing = false



// TWITCH CONNECTION
const tmi = require('tmi.js');
const clueclient = new tmi.Client({
	options: { debug: true },
	connection: { reconnect: true },
	identity: {
		username: 'CIuebot',
		password: 'oauth:2nfmnzlwdwb0z26wzxw3ovxenpvqmv'
	},
	channels: [ 'cluelesslexx' ]
});
clueclient.connect();
//FOLLOWER COUNT DISCORD CHANNEL
setInterval(function() {
request('https://api.crunchprank.net/twitch/followcount/cluelesslexx', function (error, response, body) {
	client.channels.cache.get("823248622438449182").setName("Followers: " + body)
});
}, 300000)
// STREAM ON/OFF ALERTING
async function sendmessage(){
	streammessage = await client.channels.cache.get("817218356712570880").send("**Hello Gamers,**\n Clueless is live! Come and watch at https://twitch.tv/cluelesslexx \n|| @everyone ||")
}
realtime.on('stream-up', (time,channel) => {
	sendmessage()
	live = 1
});
realtime.on('stream-down', (time,channel) => {
	streammessage.delete()
	live = 0
	
});
// DISCORD BOT STATUS
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  let statuses = ['Clueless', 'Jake make me smart',"Clueless's Server","Clueless's Followers"]
  setInterval(function() {
		let statusr = statuses[Math.floor(Math.random()*statuses.length)];
		if(live == 0){
			if(testing == true){
				client.user.setPresence({
    status: "dnd",
    activity: {
        name: "Development",
        type: "PLAYING"
				
			}
				})
			}else{
		client.user.setPresence({
    status: "online",
    activity: {
        name: statusr,
        type: "WATCHING"
    }
});
			}
		}else{
			
			
			client.user.setActivity("Cluelesslexx", {
  type: "STREAMING",
  url: "https://www.twitch.tv/cluelesslexx"
});
		
		}

	}, 15000)
  
});
//TWITCH CHATBOT
clueclient.on('message', (channel, tags, message, self) => {
	if(message.toLowerCase().includes("texture") && tags.username != "ciuebot"){
		clueclient.say(channel, "Hi, I think you are trying to find out clueless's texture pack! It can be found here: https://bit.ly/3malo5p")
		return;
	}
	if(message.toLowerCase().includes("pog") && tags.username != "ciuebot"){
		clueclient.say(channel, "POG")
		return;
	}
	if(message.toLowerCase().includes("discord") && tags.username != "ciuebot"){
		clueclient.say(channel, `Hi, I think you are trying to find out clueless's discord server! It can be found here: https://discord.gg/VRmNr9fg2b`);
		return;
	}
	if(self || !message.startsWith('!')) return;
	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();
	// COMMANDS
	if(command === 'discord') {
		clueclient.say(channel, `@${tags.username}, here is our discord link: https://discord.gg/VRmNr9fg2b`);
	}
	if(command === 'pog') {
		clueclient.say(channel, "POG!");
	}
});
clueclient.on("emoteonly", (channel, enabled) => {
	if(enabled){
		console.log("ON")
		clueclient.say(channel,"Emote only mode has now been enabled. You can only use emotes to chat.")
	}else{
		console.log("OFF")
		clueclient.say(channel,"Emote only mode has now been disabled. You can now use text to chat.")
	}
});
clueclient.on("ban", (channel, username, reason, userstate) => {
    clueclient.say(channel,username+" has now successfully been banned!")
})
clueclient.on("mod", (channel, username) => {
    clueclient.say(channel,username+" has now successfully been modded!")
});
clueclient.on("unmod", (channel, username) => {
    clueclient.say(channel,username+" has now successfully been modded!")
});
clueclient.on("subscription", (channel, username, method, message, userstate) => {
    clueclient.say(channel,username+" thanks for subbing to clueless!")
});
clueclient.on("resub", (channel, username, months, message, userstate, methods) => {
    // Do your stuff.
    let cumulativeMonths = ~~userstate["msg-param-cumulative-months"];
	clueclient.say(channel,username+" thanks for resubbing to clueless for "+cumulativeMonths+" months!")
});
clueclient.on("subgift", (channel, username, streakMonths, recipient, methods, userstate) => {
    clueclient.say(channel,username+" thanks for gifting subs!")
});
client.on("hosted", (channel, username, viewers, autohost) => {
	if(autohost){ return }
	clueclient.say(channel,username+" thanks for hosting to clueless with "+viewers+" viewers!")
});
client.on("hosting", (channel, target, viewers) => {
	clueclient.say("#"+target,"Cluelesslexx has raided you with " + viewers + "viewers!")
});
// DISCORD BOT	
	client.on('message', async (message) => {
		if(message.member.roles.has(817221660746842112) || message.member.roles.has(817237972717666365)){
		console.log("mod")}else{return}
    if(message.author.bot) return;
    if(!message.content.startsWith("!")) return;
    const args = message.content.slice(1).split(' ');
    const command = args[0].toLowerCase();
  if (command === 'recording') {
	if(message.mentions.members.first()){
		message.channel.send("**Added recording channel permissions to "+args[1]+ " for 6 hours**")
		message.mentions.members.first().roles.add(message.guild.roles.cache.get("850117309091282985"))
		setTimeout(function(){
		message.mentions.members.first().roles.remove(message.guild.roles.cache.get("850117309091282985"))
		},21600);
	}else{
		return message.channel.send("**User was not specified**")
	}
  }
  if (command === 'streaming') {
	if(message.mentions.members.first()){
		
		message.channel.send("**Added streaming channel permissions to "+args[1]+ " for 6 hours**")
		message.mentions.members.first().roles.add(message.guild.roles.cache.get("850117313641709588"))
		setTimeout(function(){
		message.mentions.members.first().roles.remove(message.guild.roles.cache.get("850117313641709588"))
		},21600);
	}else{
		return message.channel.send("**User was not specified**")
	}
  }
  if (command === 'editing') {
	if(message.mentions.members.first()){
		message.channel.send("**Added editing channel permissions to "+args[1]+ " for 6 hours**")
		message.mentions.members.first().roles.add(message.guild.roles.cache.get("850117315983179826"))
		setTimeout(function(){
		message.mentions.members.first().roles.remove(message.guild.roles.cache.get("850117315983179826"))
		},21600);
	}else{
		return message.channel.send("**User was not specified**")
	}
  }
  });
client.login('NzA0MzY3ODc3MDk1OTQ4NDAw.XqcHtA.NTxjDWA7qFkuBbu1AD_UYeGD_V0');
