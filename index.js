const Discord = require('discord.js');
const client = new Discord.Client();


client.on("message", message =>
{
    if(message.member.nickname == "reviR")
    {
        message.member.ban(message.member);
    }
})
client.on("guildCreate", guild => { //adds the guild it joined to the list of joined guilds.
    if(guild.roles.cache.has('Playing Tarkov'))
    {
        console.debug('Playing Tarkov role aready exists');
    }
    else{
        guild.roles.create({
            data:{
                name: 'Playing Tarkov',
                color: 'red'
            }
        });
    }
    if(guild.channels.cache.has('playing-tarkov'))
    {
        console.debug('playing-tarkov already exists');
    }
    else{
        guild.channels.create({
            data:{
                name: 'playing-tarkov'
            }
        });
    }
})


client.on("presenceUpdate", (old,updated) => {
    var role = updated.guild.roles.cache.find(role => role.name === 'Playing Tarkov');
    var activity = updated.user.presence.activities;
    //console.debug(activity);
    if(activity[0] !== undefined){
        //console.debug(activity[0].name);
        if(activity[0].name === 'Escape from Tarkov')
        {
            //console.debug(updated.user.presence.activities[0].name);
            updated.member.roles.add([role.id])
            .then(console.log)
            .catch(console.error);
        
            //console.debug(role.name);
            console.debug(role.name + ' was givin to ' + updated.member.displayName);
            //console.debug("added role");
            
        }
        if(activity[0].name !== 'Escape from Tarkov' && updated.member.roles.cache.has(role.id))
        {
        
           updated.member.roles.remove([role.id])
           .then(console.log)
           .catch(console.error);
           console.log('took away ' + role.name + ' from ' + updated.member.displayName);
        }
        
    }
})



//console.log(client.guilds.cache)
client.login(); //Hiding API Key
