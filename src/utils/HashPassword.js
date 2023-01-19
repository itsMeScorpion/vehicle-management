import CryptoJS from 'crypto-js';

export const encrypt = (password) => {
  console.log(password);
  var ciphertext = CryptoJS.AES.encrypt(
    password,
    'my-secret-key@123'
  ).toString();
  console.log(ciphertext);
  return ciphertext;
};

export const decrypt = (password) => {
  var bytes = CryptoJS.AES.decrypt(password, 'my-secret-key@123');
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  console.log('ssssss', decryptedData.length);
  return decryptedData;
};
// console.log(decrypt('U2FsdGVkX1/kpBgX9LbErU2m9CqHS54gn6ORzK66mMs='));
