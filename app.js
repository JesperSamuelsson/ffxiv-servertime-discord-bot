const token = process.env.TOKEN;
const {Client, GatewayIntentBits, Status} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});
client.on('ready',() => {

    console.log("Connected");
    clockFunctions();
})
const addZero = (i) => {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

const getServerTime = (targetTime) => {
    let currentDate = new Date();
    if (typeof targetTime !== 'undefined') {
        currentDate.setTime(targetTime);
    }
    return `${addZero(currentDate.getUTCHours())}:${addZero(currentDate.getUTCMinutes())} ST`;
}


const clockFunctions = async () => {
    let currentDate = new Date();
    
    for (const [guildId, guild] of client.guilds.cache) {
        try {
            const botMember = await guild.members.fetchMe();
            await botMember.setNickname(getServerTime());
        } catch (err) {
            console.error('Failed to set nickname in guild')
        }
    }

    let Interval = (60 - currentDate.getUTCSeconds()) * 1000 + 5;
    setTimeout(clockFunctions, Interval);
}

client.login(token);
