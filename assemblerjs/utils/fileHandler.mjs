import { open } from 'node:fs/promises';
import path from 'path';

import { isTypeI, isTypeJ } from './convertACommandLineToBinary.mjs';

const directory = path.resolve('tmp', 'teste.asm');

let fileHandle;

try {
     fileHandle = await open(directory, 'r');

     const file = await fileHandle.readFile({ encoding: 'utf-8' });
     
     const usefulLines = file.split('\n').filter((line) => line.trim());

     //console.log(usefulLines);

     let labelsTable = [];

     // colocar os labels com sua respecitiva linha em uma tabela
     usefulLines.forEach((line, index) => {
          if (line.includes(':')) {
               labelsTable.push({
                    label: line.split(' ')[0].split(':')[0],
                    line: index,
               });
          } 
     });

     usefulLines.forEach((line) => console.log(line, isTypeJ(line)));
     console.log(labelsTable);


} catch (err) {
     console.log(err);
     await fileHandle?.close();
}
