export const
  ROOMS = /([0-9]-(x|х) | [0-9]\s?(к|х) | [0-9]\D+ комнаты)/ig,
  PRICE = /((\d|\d.)+(грн|\$|доларов))/ig,
  PHONE = /(\d{10}|\+38\d{10})/i,
  STREET = /((вул|Вул|Ул).?\D+\d+\D?)/ig;
