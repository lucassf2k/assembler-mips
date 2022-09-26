import { question } from 'readline-sync';

import { getLabelsTable, readFile, write } from './utils/fileHandler.mjs';
import { 
  isTypeI, 
  isTypeJ, 
  isTypeR, 
  convertACommandLineToBinaryForTypeR,
  convertACommandLineToBinaryForTypeI,
  convertACommandLineToBinaryForTypeJ
} from './utils/convertACommandLineToBinary.mjs';
import * as convert from './utils/baseConverter.mjs';

const filename = question("Digite o nome do arquivo: ");

//const directory = path.resolve('tmp', filename);
try {
  const file = await readFile(filename);

const labels = getLabelsTable(file);

let address = Number(convert.toConvertHexToDec('0x00400000'));
let codeAsm = [];

file.forEach((line, index) => {
  if (isTypeR(line)) {
    codeAsm.push(convertACommandLineToBinaryForTypeR(line));
    address += 4;
  } else if (isTypeI(line)) {
    codeAsm.push(convertACommandLineToBinaryForTypeI(line, index, address, labels));
    address += 4;
  } else if (isTypeJ(line)) {
    codeAsm.push(convertACommandLineToBinaryForTypeJ(line, index, address, labels));
    address += 4;
  } else {
    console.log("Erro ao analisar o arquivo");
  }
});

const code  = codeAsm.map((line) => line.concat('\n'));

const fileSaved = filename.split('.')[0].concat('.bin');
await write(fileSaved, code);

} catch (err) {
  console.log(err);
}
