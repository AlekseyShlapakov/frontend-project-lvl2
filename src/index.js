import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

const genDiff = (filePath1, filePath2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filePath1), 'utf8'));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filePath2), 'utf8'));

  const sharedData = _.union(Object.keys(data1), Object.keys(data2))
    .sort()
    .map((key) => {
      if (!_.has(data1, key)) {
        return `+ ${key}: ${data2[key]}`;
      }
      if (!_.has(data2, key)) {
        return `- ${key}: ${data1[key]}`;
      }
      if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
        return `${key}: ${data1[key]}`;
      }
      if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
        return `- ${key}: ${data1[key]}
  + ${key}: ${data2[key]}`;
      }
    })
    .join('\n  ');

  const newData = `
{
  ${sharedData}
}`;
  console.log(newData);
};

export default genDiff;
