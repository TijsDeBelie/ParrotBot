const authors = [];
global.warned = [];
global.banned = [];
global.banlist = [];
var messagelog = [];

/**
 * Add simple spam protection to your discord server.
 * @param  {Bot} bot - The discord.js CLient/bot
 * @param  {object} options - Optional (Custom configuarion options)
 * @return {[type]}         [description]
 */
module.exports = function (bot, options) {
  // Set options
  const warnBuffer = (options && options.prefix) || 5;
  const maxBuffer = (options && options.prefix) || 8;
  const interval = (options && options.interval) || 2500;
  const warningMessage = (options && options.warningMessage) || "Stop spamming!";
  const banMessage = (options && options.banMessage) || "has been muted for spamming";
  const maxDuplicatesWarning = (options && options.duplicates || 5);
  const maxDuplicatesBan = (options && options.duplicates || 7);

  bot.on('message', msg => {

    if (msg.author.id != bot.user.id) {
      var now = Math.floor(Date.now());
      authors.push({
        "time": now,
        "author": msg.author.id
      });
      messagelog.push({
        "message": msg.content,
        "author": msg.author.id
      });

      // Check how many times the same message has been sent.
      var msgMatch = 0;
      for (var i = 0; i < messagelog.length; i++) {
        if (messagelog[i].message == msg.content && (messagelog[i].author == msg.author.id) && (msg.author.id !== bot.user.id)) {
          msgMatch++;
        }
      }
      // Check matched count
      if (msgMatch == maxDuplicatesWarning && !warned.includes(msg.author.id)) {
        warn(msg, msg.author.id);
      }
      if (msgMatch == maxDuplicatesBan && !banned.includes(msg.author.id)) {
        ban(msg, msg.author.id);
      }

      matched = 0;

      for (var i = 0; i < authors.length; i++) {
        if (authors[i].time > now - interval) {
          matched++;
          if (matched == warnBuffer && !warned.includes(msg.author.id)) {
            warn(msg, msg.author.id);
          }
          else if (matched == maxBuffer) {
            if (!banned.includes(msg.author.id)) {
              ban(msg, msg.author.id);
            }
          }
        }
        else if (authors[i].time < now - interval) {
          authors.splice(i);
          //warned.splice(warned.indexOf(authors[i]));
          //banned.splice(warned.indexOf(authors[i]));
        }
        if (messagelog.length >= 200) {
          messagelog.shift();
        }
      }
    }
  });

  /**
   * Warn a user
   * @param  {Object} msg
   * @param  {string} userid userid
   */
  function warn(msg, userid) {
    warnlist.push("<@" + userid + ">");
    var user = msg.channel.guild.members.find(member => member.user.id === msg.author.id);
    warned.push("\n" + user + " Spamming");
    console.log(msg.content);
    msg.channel.send(msg.author + " " + warningMessage);
    
  }

  /**
   * Ban a user by the user id
   * @param  {Object} msg
   * @param  {string} userid userid
   * @return {boolean} True or False
   */
  function ban(msg, userid) {
    for (var i = 0; i < messagelog.length; i++) {
      if (messagelog[i].author == msg.author.id) {
        messagelog.splice(i);

        let Punished = msg.guild.roles.find("name", "Punished");
        let Trusted = msg.guild.roles.find("name", "Trusted");
        let Member = msg.guild.roles.find("name", "Member");
        let Admin = msg.guild.roles.find("name", "Admin");
        msg.member.removeRole(Admin);
        msg.member.removeRole(Trusted);
        msg.member.removeRole(Member);
        msg.member.addRole(Punished);
        
    }



    banned.push(msg.author.id);

    var user = msg.channel.guild.members.find(member => member.user.id === msg.author.id);
    if (user) {
      
        msg.channel.send(msg.author + " " + banMessage);
        client.channels.get('325619660206637057').send(msg.author + " " + banMessage);
        banlist.push("\n" + msg.author + " " + banMessage);
      
    }
  }




}
}
