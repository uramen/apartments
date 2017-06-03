import winston from 'winston';

class Pattern {
  constructor(exec){
    this.exec = exec;
  }
}

const
  roomsRegexp = /\d[х]/,
  priceRegexp =

const rgx = regexp => {
    return new Pattern((str, pos) => {
        let m = regexp.exec(str.slice(pos));
        if (m && m.index === 0)
            return { res: m[0], end: pos + m[0].length };
    });
}



const text = "Здається 2х.кімн., центр - пл.Філармонія, 2-й поверх, ремонт, індивідуальне опалення, гар.вода, без меблів, кухонні меблі та холодильник можуть бути, 3500грн.+ком.пос., 0661331858, 0966413256";

console.log(rgx(/^2$/).exec(text, 0));
