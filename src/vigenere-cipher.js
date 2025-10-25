const { NotImplementedError } = require('../lib');

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
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (char >= 'A' && char <= 'Z') {
        const mCode = char.charCodeAt(0) - 65;
        const kCode = key[keyIndex % key.length].charCodeAt(0) - 65;
        const encryptedChar = String.fromCharCode(((mCode + kCode) % 26) + 65);
        result += encryptedChar;
        keyIndex += 1;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
  if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');

  encryptedMessage = encryptedMessage.toUpperCase();
  key = key.toUpperCase();

  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < encryptedMessage.length; i++) {
    const char = encryptedMessage[i];

    if (char >= 'A' && char <= 'Z') {
      const eCode = char.charCodeAt(0) - 65;
      const kCode = key[keyIndex % key.length].charCodeAt(0) - 65;
      const decryptedChar = String.fromCharCode(((eCode + kCode) % 26) + 65);
      result += decryptedChar;
      keyIndex += 1;
    } else {
      result += char;

    }
  }

  return this.isDirect ? result : result.split('').reverse().join('');
}

}


module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
