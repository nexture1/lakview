

const Commando = require('discord.js-commando');
const talkedRecently = new Set();

const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTcyMTQ1MzYyNTg0ODYyODEz.XMdMow.dMFFzpIYJxRH84wFvaVFtAOPbrY";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D981173B870AF5D653AFFE04F6A2301FAE3690C44436B4E65BD31C6E5C320CFAC0BD94B73C8FCDBDE2EA46D9A055BB95B85851FE607ECCB50F2D1BC59900F4823CCD75BC11C131655AC6804CD6E9BECBD0D9E5CEE31E6209EA341F99064A671D0D1811F2258AE1731A4AC80F9386C8D6FC14D154AB400E38B38D58C400961208A8BC490159364222D6A3465069454A195AE2A9C31189073838C41D6E09A9320FCD37C2E7DB92FA647788AF8AB4633887593398F14E12445C53CDF0F891834785A944D6C737562A8C555B7F412F30738E92B1C821C8260509A27B65110B6803B2C86BA489277FBEC12D35D2DF8A6FD621B806ABE08A6C5DD20142D02C311AE5FAA888AE13A933B60A902E59F1A813D974C5DDE6FCFFAEFDBEFB66E92F7A702C1686C607C35B47C097D9127C37146A2F57A3034C5B"
var prefix = '#';
var groupId = 4878430;
var maximumRank = 255;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
    
       if(!message.member.roles.some(r=>["BotAdmin","Developers","Chairman"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You do not have permission to use this command. Very sad. ");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
          //embed start
          message.channel.send({embed: {
            color: 14177041,
            description: `Checking ROBLOX for ${username}`
          }});
          //end

            //message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                      message.channel.send({embed: {
                        color: 14177041,
                        description: `${id} is rank ${rank} and not promotable. :exclamation: `
                      }});
                        //message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                      message.channel.send({embed: {
                        color: 14177041,
                        description: `${id} is rank ${rank} and promotable. :white_check_mark: `
                      }});
                     
                        //message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                          message.channel.send({embed: {
                            color: 3447003,
                            description: `Changed rank to ${newRole.Name}`
                          }});
                            //message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send({embed: {
                              color: 3447003,
                              description: `:exclamation:  I'm not even ranked or I have a invalid cookie <@459017979103936523> revive me. :exclamation: `
                            }});
                            //message.channel.send("I'm not even ranked or I have a invalid cookie <@459017979103936523> revive me.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("This mans is not even in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})




  client.on("ready", () => {
    client.user.setActivity("builderman", { type: "STREAMING", url: "https://www.roblox.com/users/84803860/profile" })
  })
  
 
   
  client.on('message', function(message){
    if(message.content == '+help')
  {
    message.channel.send({embed: {
        color: 3447003,
        
        
        title: "Here are the commands.",
        
        description: "Discord -> roblox",
        fields: [{
            name: "+rank (plr) (role #)",
            value: "Ranks the player in the group"
          },
          
          
        ],
       
       
        timestamp: new Date(),
        footer: {
          
          text: "Buildermane"
        }
      }
    });
  }
  
  });
