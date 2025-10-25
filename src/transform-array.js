const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!");

  const result = [];
  const commands = ['--discard-next', '--discard-prev', '--double-next', '--double-prev'];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    switch (current) {
      case '--discard-next':
        if (i + 1 < arr.length) i++;
        break;

      case '--discard-prev':
        if (i > 0 && arr[i - 2] !== '--discard-next') result.pop();
        break;

      case '--double-next':
        if (i + 1 < arr.length) result.push(arr[i + 1]);
        break;

      case '--double-prev':
        if (i > 0 && arr[i - 2] !== '--discard-next') result.push(arr[i - 1]);
        break;

      default:
        result.push(current);
    }
  }

  return result;
}


module.exports = {
  transform
};
