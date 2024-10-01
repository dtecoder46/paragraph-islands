const express = require('express');
const readline = require('readline');
const fs = require('fs');
const { exec } = require('child_process');

// minimum input: 1 paragraph

function write(text, chunk) {
  const json = `{\n\t\"text\": \"${text}\",\n$\t\"chunk_length\": ${chunk}\n}`;

  fs.writeFile("data.json", json, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  js();
}

function js() {
  exec("node process.js", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
}

function cpp() {
  exec("g++ -o main main.cpp", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });

  sleep(100000);
  
  exec("./main", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const app = express();

app.use(express.static('web'));

app.get('/', (req, res) => {
  res.send("Paragraph Islands");
});

app.listen(3000, () => {
  console.log('Express server initialized');
});

fs.readFile("text.txt", "utf8", function (err, data) {
  if (err) {
    console.error(err);
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('Enter the chunk size: ', (size) => {
      write(data, size);
    });
  }
});
