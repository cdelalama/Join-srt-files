# Transcription File Processor

This project includes a script for processing transcription files. The script reads all .txt files from an input directory, sorts them by chunk number, renames them by removing anything after "transcription" and before ".txt", and writes the processed data to output .srt and .txt files.

## Features

- Read all .txt files from an input directory
- Sort files by chunk number
- Rename files by removing anything after "transcription" and before ".txt"
- Write processed data to output .srt and .txt files

## Usage

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Place your .txt files in the `input` directory.
5. Run `npm run dev` to execute the script.
6. The processed files will be written to the `output` directory.

## License

This project is licensed under the MIT License.