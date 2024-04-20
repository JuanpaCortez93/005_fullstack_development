/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from 'qr-image';
import {createWriteStream, writeFile} from "fs";

inquirer
  .prompt([
    {
      name: 'userInput',
      message: 'Enter your name to create a QR Code: '
    },
  ])
  .then(answers => {
    //Create the QR Code Image
    let qr_png = qr.image(answers.userInput);
    qr_png.pipe(createWriteStream('qr_img.png'));

    //Save the name input
    writeFile("./text.txt", answers.userInput, (err) => {
        if(err) throw err;
        console.log("Text saved");
    });
  }).catch(err => {
    console.log(err);
  });