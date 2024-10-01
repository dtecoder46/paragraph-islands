const fs = require("fs")

function scan_split(text_val, chunk_val) {

  text_val2 = text_val.split(".");
  
  for (let i = 0; i < text_val2.length - 1; i++) {
    let new_i = i + 1;
    if (new_i % chunk_val == 0) {
      text_val2[i] += "\n\n-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n";
    }
  }

  text_val2[text_val2.length - 1] = ""; // There was an issue where a random comma kept appearing at the end of the array, so this was implemented to hide the comma

  return text_val2;
}

function isolation(data) {
    let data1 = data.replace("{", "");
    let data2 = data1.replace("}", "");
    let data3 = data2.replaceAll("\t", "");
    let data4 = data3.replace(",", "");
    let data5 = data4.replaceAll("\"", "");

    let data_arr = data5.split("$"); // no $ in input text
    let text = data_arr[0];

    let text_arr = text.split(": "); // no : in input text

    let text_val = text_arr[1];

    return text_val;
}

function isolation2(data) {
  let data1 = data.replace("{", "");
  let data2 = data1.replace("}", "");
  let data3 = data2.replaceAll("\t", "");
  let data4 = data3.replace(",", "");
  let data5 = data4.replaceAll("\"", "");

  let data_arr = data5.split("$");
  let chunk = data_arr[1];
  let chunk_arr = chunk.split(": ");
  let chunk_num = chunk_arr[1];

  return chunk_num;
}

fs.readFile("data.json", "utf8", function (err, data) {
  if (err) {
    console.log(err);
  }

  else {
    text_val = isolation(data);
    chunk_val = isolation2(data);

    // paragraph island styling

    console.log("\n");
    
    for (let i = 0; i < 31; i++) {
      process.stdout.write("-+");
    }

    text_val2 = scan_split(text_val, chunk_val);

    console.log("\n");

    for (let k = 0; k < text_val2.length; k++) {
      console.log(text_val2[k]);
    }

    for (let i = 0; i < 31; i++) {
      process.stdout.write("-+");
    }
  }
});