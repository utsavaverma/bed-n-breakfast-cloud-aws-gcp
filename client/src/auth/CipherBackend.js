//reference - https://www.geeksforgeeks.org/transforming-a-plain-text-message-to-cipher-text/
//https://blog.cloudboost.io/create-your-own-cipher-using-javascript-cac216d3d2c


export const generateEncryptedCipher = () => {
  const charString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 3;
  var result = "";
  for (var i = length; i > 0; --i) {
    result += charString[Math.floor(Math.random() * charString.length)];
  }
  return result;
};
