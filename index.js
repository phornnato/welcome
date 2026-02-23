const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8658959369:AAGGAMiDzMF9BNr_0HGy_RQl3BW2QTn1hQQ";

const bot = new TelegramBot(TOKEN, { polling: false });

const app = express();
app.use(express.json());

// Webhook receiver
app.post("/webhook", (req, res) => {

    const update = req.body;

    if(update.message && update.message.new_chat_members){

        update.message.new_chat_members.forEach(user => {

            const name = user.first_name;

            bot.sendMessage(
                update.message.chat.id,
                `សូមស្វាគមន៍ ${name} មកកាន់ channel genz របស់យើង`
            );

        });
    }

    res.sendStatus(200);
});

// IMPORTANT → Render needs this port binding
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Bot running on port " + PORT);
});
