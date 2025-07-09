export class RomanNumerals {
  static RomanVal = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  static toRoman(num) {
    num = parseFloat(num);
    return Object.entries(this.RomanVal)
      .reverse()
      .reduce((acc, [key, value], index, arr) => {
        let repetear;
        if (index >= 1) {
          repetear = Math.floor(
            Object.values(this.RomanVal)
              .slice(0, -1)
              .slice(-index)
              .reverse()
              .reduce((acc, cur, indexJ) => {
                return indexJ + 1 === index ? acc / value : (acc = acc % cur);
              }, num % 1000)
          );
        } else {
          repetear = Math.floor(num / 1000);
        }
        return (acc =
          repetear === 4
            ? acc.slice(-1) === arr[index - 1][0]
              ? acc
                  .replace(acc.slice(-1), "")
                  .concat(`${key}${arr[index - 2][0]}`)
              : `${acc.concat(`${arr[index][0]}${arr[index - 1][0]}`)}`
            : acc.concat(key.repeat(repetear)));
      }, "");
  }

  static fromRoman(str) {
    return str.split("").reduce((acc, cur, index, arr) => {
      if (this.RomanVal[arr[index + 1]] > this.RomanVal[cur]) {
        return (acc += this.RomanVal[arr[index + 1]]) - this.RomanVal[cur];
      }
      return (acc =
        this.RomanVal[arr[index - 1]] < this.RomanVal[cur]
          ? acc
          : acc + this.RomanVal[cur]);
    }, 0);
  }
}
