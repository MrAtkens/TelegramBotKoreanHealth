'use strict';

var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _products = require('./products');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKEN = '802225174:AAEsFatVSr-w2H43KzWK9n1uRoZ4Mx9J1mo';

var bot = new _nodeTelegramBotApi2.default(TOKEN, { polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

bot.onText(/\/start/, function (msg) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, "Здраствуйте чтобы узнать напишите любой текст для получение списка товаров");
});

bot.on('message', function (msg) {
  var chatId = msg.chat.id;

  if (msg.text === 'Закрыть') {
    bot.sendMessage(chatId, 'Закрываю меню', {
      reply_markup: {
        remove_keyboard: true
      }
    });
  } else if (msg.text === 'Корейские препараты') {
    bot.sendMessage(chatId, 'Открываю список', {
      reply_markup: {
        keyboard: _products.koreanProducts
      }
    });
  } else if (msg.text === 'Продукция LIaton') {
    bot.sendMessage(chatId, 'ᅠ', {
      reply_markup: {
        keyboard: _products.liatonProducts
      }
    });
  } else if (msg.text === 'Узнать цены') {
    bot.sendMessage(chatId, _products.prices, { parse_mode: "markdown" });
  } else {
    bot.sendMessage(chatId, 'Открываю меню', {
      reply_markup: {
        keyboard: _products.menu
      }
    });
  }

  _products.koreanProducts.map(function (element) {
    element.map(function (product) {
      if (product === 'Закрыть') {
        //
      } else if (msg.text === product) {
        var data = _fs2.default.readFileSync(__dirname + ('/PDF/' + product + '.pdf'));
        var fileOptions = {
          filename: product + '.pdf',
          contentType: 'application/pdf'
        };
        bot.sendDocument(chatId, data, {}, fileOptions);
      }
    });
  });

  _products.liatonProducts.map(function (element) {
    element.map(function (product) {
      if (product === 'Закрыть') {
        //
      } else if (msg.text === product) {
        var data = _fs2.default.readFileSync(__dirname + ('/Liaton/' + product + '.pdf'));
        var fileOptions = {
          filename: product + '.pdf',
          contentType: 'application/pdf'
        };
        bot.sendDocument(chatId, data, {}, fileOptions);
      }
    });
  });
});