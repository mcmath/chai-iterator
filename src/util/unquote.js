export default function(string) {
  return new Unquote(string);
}

class Unquote {
  constructor(str) {
    this._str = str;
  }

  inspect() {
    return this.toString();
  }

  toString() {
    return this._str;
  }
}
