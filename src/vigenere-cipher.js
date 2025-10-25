const { NotImplementedError } = require("../lib");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    return this.process(message, key, true);
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    return this.process(message, key, false);
  }

  process(message, key, isEncrypt) {
    const A = 'A'.charCodeAt(0);
    const Z = 'Z'.charCodeAt(0);

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      if (char >= 'A' && char <= 'Z') {
        const mCode = char.charCodeAt(0) - A;
        const kCode = key[keyIndex % key.length].charCodeAt(0) - A;

        let newCode;
        if (isEncrypt) {
          newCode = (mCode + kCode) % 26;
        } else {
          newCode = (mCode - kCode + 26) % 26;
        }

        result += String.fromCharCode(newCode + A);
        keyIndex++;
      } else {
        result += char;
      }
    }
    return this.direct ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
