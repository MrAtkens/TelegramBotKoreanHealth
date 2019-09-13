import TelegramBot  from 'node-telegram-bot-api'
import fs from 'fs'

const TOKEN = '802225174:AAEsFatVSr-w2H43KzWK9n1uRoZ4Mx9J1mo'

import { liatonProducts, koreanProducts, menu, prices} from './products'

const bot = new TelegramBot(TOKEN, {polling:{
  interval: 300,
  autoStart: true,
  params:{
    timeout: 10
  }
 }
});

bot.onText(/\/start/, msg => {
  const fromId = msg.from.id;
  bot.sendMessage(fromId, "Здраствуйте чтобы узнать напишите любой текст для получение списка товаров");
});

bot.on('message', msg => { 
  const chatId = msg.chat.id

  if(msg.text === 'Закрыть'){
    bot.sendMessage(chatId, 'Закрываю меню', {
      reply_markup:{
        remove_keyboard: true
      }
    })
  }
  else if(msg.text === 'Корейские препараты'){
    bot.sendMessage(chatId, 'Открываю список', {
      reply_markup: {
       keyboard: koreanProducts
     }
   })
  }
  else if(msg.text === 'Продукция LIaton'){
    bot.sendMessage(chatId, 'ᅠ', {
      reply_markup: {
       keyboard: liatonProducts
     }
   })
  }
  else if(msg.text === 'Узнать цены'){
    bot.sendMessage(chatId, prices, {parse_mode: "markdown"})
  }
  else{
  bot.sendMessage(chatId, 'Открываю меню', {
     reply_markup: {
      keyboard: menu
    }
  });
 }

 koreanProducts.map(element => {
   element.map(product => {
    if(product === 'Закрыть'){
      //
    }
    else if(msg.text === product){
      const data = fs.readFileSync(__dirname + `/PDF/${product}.pdf`)
      const fileOptions = {
        filename: `${product}.pdf`,
        contentType: 'application/pdf',
      };
      bot.sendDocument(chatId, data, {}, fileOptions)
    }
   })
 })

 liatonProducts.map(element => {
  element.map(product => {
   if(product === 'Закрыть'){
     //
   }
   else if(msg.text === product){
     const data = fs.readFileSync(__dirname + `/Liaton/${product}.pdf`)
     const fileOptions = {
       filename: `${product}.pdf`,
       contentType: 'application/pdf',
     };
     bot.sendDocument(chatId, data, {}, fileOptions)
   }
  })
})

});