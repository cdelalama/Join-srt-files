import fs from "fs";
import path from "path";

const inputDir = path.join(__dirname, "/input");
const outputFilePathSrt = path.join(__dirname, "/output/output.srt");
const outputFilePathTxt = path.join(__dirname, "/output/output.txt");

// Read all files in the input directory
const files = fs.readdirSync(inputDir);
console.log('Files:', files); // Log all files

// Filter only .txt files
const txtFiles = files.filter(file => path.extname(file) === ".txt");
console.log('Text files:', txtFiles); // Log .txt files

let resultSrt = '';
let resultTxt = '';
// Sort txtFiles by chunk number
txtFiles.sort((a, b) => {
    const chunkNumberA = parseInt(a.split('-')[2]);
    const chunkNumberB = parseInt(b.split('-')[2]);
    return chunkNumberA - chunkNumberB;
  });
txtFiles.forEach((file, index) => {
    const filePath = path.join(inputDir, file);
    const data = fs.readFileSync(filePath, "utf-8");
  
    // Check if file name contains a number inside parentheses after the word "transcription"
    const match = file.match(/transcription.*\.txt$/);
    if (match) {
      // Remove anything after "transcription" and before ".txt"
      const newFileName = file.replace(/transcription.*(\.txt)/, 'transcription$1');
      const newFilePath = path.join(inputDir, newFileName);
      fs.renameSync(filePath, newFilePath);
      // Update the file name in the txtFiles array
      txtFiles[index] = newFileName;
      console.log(`Renamed file ${file} to ${newFileName}`); // Log renamed files
    }
  
    // Check if file name contains the word "timestamped"
    if (file.includes('timestamped')) {
      resultSrt += data + "\n\n";
    } else {
      resultTxt += data.replace(/(\d+\n)?\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\n/g, '') + "\n\n";
    }
  });
// Write the results to the output files
fs.writeFileSync(outputFilePathSrt, resultSrt);
console.log(`Wrote result to ${outputFilePathSrt}`); // Log output file path

fs.writeFileSync(outputFilePathTxt, resultTxt);
console.log(`Wrote result to ${outputFilePathTxt}`); // Log output file path