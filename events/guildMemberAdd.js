const axios = require('axios')
require('dotenv').config()
const app = require("../bot.js");
const {updateStats} = require("../modules/updateStats");
const {checkIfAPIAccess, checkIfProd} = require("../modules/apiAccess");

module.exports = async (client, member) => {

	if (checkIfProd()) {
		updateStats(client)
	}

	if (!member.user.bot()) {
		axios({
			"method": "GET",
			"url": `${process.env.API_SERVER}/karen/profile/`,
			"headers": {
				"Authorization": process.env.AUTH_B64,
				"Content-Type": "application/json; charset=utf-8",
				'User-Agent': process.env.AUTH_USERAGENT
			},
			"auth": {
				"username": process.env.AUTH_USER,
				"password": process.env.AUTH_PASS
			},
			"params": {
				"id": member.id
			}
		}).then((response) => {
			// If success, return
			return
		}, (error) => {
			// If error (which means person doesn't have a profile), create one
			const profile = {
				description: "I am someone who got their profile auto generated by a bot",
				gender: "Not specified",
				birthday: "Not specified",
				country: "None",
				rank: "",
				languages: "None"
			}
			// Sends profile to server
			axios({
				"method": "POST",
				"url": `${process.env.API_SERVER}/karen/profile/`,
				"headers": {
					"Authorization": process.env.AUTH_B64,
					"Content-Type": "application/json; charset=utf-8",
					'User-Agent': process.env.AUTH_USERAGENT
				},
				"auth": {
					"username": process.env.AUTH_USER,
					"password": process.env.AUTH_PASS
				},
				"data": {
					profile,
					"id": member.id
				}
			})
		});
	}

	// this is my shitty way of handling role adds
	// dont call me out on this, this is our little secret ok?
	if (member.guild.id == '826439565086425098') {
		let role = member.guild.roles.cache.find(r => r.name === "peasants");
		member.roles.add(role)
	}
	if (member.guild.id == '828999868239708220') {
		let role1 = member.guild.roles.cache.get("829007236222812222");
		let role2 = member.guild.roles.cache.get("829007055745974312");
		let role3 = member.guild.roles.cache.get("829006864574185502");
		let role4 = member.guild.roles.cache.get("829032788652195850");
		let role5 = member.guild.roles.cache.get('829005429655863387')
		member.roles.add(role1)
		member.roles.add(role2)
		member.roles.add(role3)
		member.roles.add(role4)
		member.roles.add(role5)
	}
	if (settingsmap.get(member.guild.id).welcomeEnabled == false) return;
	const channel = member.guild.channels.cache.find(ch => ch.id == settingsmap.get(member.guild.id).welcomeChannel);
	channel.send(`Welcome to this server, ${member}.`);
	member.send('READ THE RULES\nDO IT NOW\nYOU BETTER FUCKING DO IT')
}