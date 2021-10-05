/* eslint-disable @typescript-eslint/camelcase */
import fs from 'fs';
import Config from '../env';
import KanvasSDK from '../src/index';

function dataURLtoFile(dataurl: string, filename: string, mime: string): File {
  const bstr = atob(dataurl);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

const client = new KanvasSDK(Config);
const filename = 'kanvas.png';
const filePath = `${__dirname}/${filename}`;
const contents = fs.readFileSync(filePath, {encoding: 'base64'});
const file = dataURLtoFile(contents, filename, 'image/png');
const email = 'demo@dealerappcenter.com';
const password = 'nosenose';

describe('Testing filesystem module', () => {
  test('Perform upload from local file', async() => {
    await client.auth.login(email, password);
    await client.filesystem.upload(file).then(response => {
      console.log(response);
    }).catch(error => {
      console.log('=========================', error);
    });
  });
});