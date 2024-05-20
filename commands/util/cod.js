const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { codInfoUrl, codInfo } = require("../../scripts/codInfo.js");
const { codLoginUrl, codLogin } = require("../../scripts/codLogin.js");

const API = require("call-of-duty-api");

require("dotenv").config();
const { COD_EMAIL: email, COD_PASSWORD: password } = process.env;

async function postLogin() {
    const response = await fetch(codLoginUrl, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive",
        },
        body: JSON.stringify(codLogin),
    });
    const data = await response.json();
    return data;
}

async function authLogin() {
    const response = await fetch(codInfoUrl, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive",
        },
        body: JSON.stringify(codInfo),
    });
    const data = await response.json();
    return data;
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    // console.log(d, h, m, s)
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Gets COD stats"),
    async execute(interaction) {
        try {
            // Fetching and writing data to json file
            const resolved = await postLogin();
            //console.log(resolved)

            await API.telescopeLogin(email, password);
            let response = await API.ModernWarfare3.fullData();
            console.log(response.data.data.genericStats);

            const embed = new EmbedBuilder();
            const timePlayed = secondsToDhms(
                response.data.data.genericStats.totalTimePlayed
            );
            embed
                .setTitle(`${response.data.data.gamertag}'s COD Stats`)
                .addFields(
                    {
                        name: "Time Played",
                        value: timePlayed,
                        inline: true,
                    },
                    {
                        name: "Level",
                        value: `${response.data.data.genericStats.level}`,
                        inline: true,
                    },
                    {
                        name: "Kills",
                        value: `${response.data.data.genericStats.kills}`,
                        inline: true,
                    },
                    {
                        name: "Deaths",
                        value: `${response.data.data.genericStats.deaths}`,
                        inline: true,
                    },
                    {
                        name: "K/D Ratio",
                        value: `${response.data.data.genericStats.killDeathRatio}`,
                        inline: true,
                    },
                    {
                        name: "Wins",
                        value: `${response.data.data.genericStats.wins}`,
                        inline: true,
                    },
                    {
                        name: "Losses",
                        value: `${response.data.data.genericStats.losses}`,
                        inline: true,
                    },
                    {
                        name: "W/L Ratio",
                        value: `${response.data.data.genericStats.winLossRatio}`,
                        inline: true,
                    },
                    {
                        name: "Most Kills In A Game",
                        value: `${response.data.data.genericStats.highestKillsPerGame}`,
                        inline: true,
                    },
                    {
                        name: "Games Played",
                        value: `${response.data.data.genericStats.totalGamesPlayed}`,
                        inline: true,
                    },
                    {
                        name: "Total Damage",
                        value: `${response.data.data.genericStats.damage}`,
                        inline: true,
                    },
                    {
                        name: "Score Per Minute",
                        value: `${response.data.data.genericStats.scorePerMinute}`,
                        inline: true,
                    }
                );

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.log(`Operation failed: ${error}`);
            await interaction.reply(`Failed to retrieve stats.`);
        }
    },
};
