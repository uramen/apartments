class Pattern {
  constructor(exec){
    this.exec = exec;
  }
}


export const rgx = regexp => {
    return new Pattern((str, pos) => {
        let m = regexp.exec(str.slice(pos));
        if (m)
            return { res: m[0], end: pos + m[0].length };
    });
}
