#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main() {
  string json;
  ifstream file("data.json");
  string line;
  while (getline(file, line)) {
    json += line;
  }
  file.close();

  // no dollar signs allowed in text
  
  string text = json.substr(2, json.find("$") - 2);
  string chunk = json.substr(json.find("$") + 2, json.length() - 1);

  string text_value = text.substr(text.find(" "), text.length() - 2);
  string chunk_value = chunk.substr(chunk.find(" "), chunk.length() - 1);


  string chunk_value2 = chunk_value.substr(0, chunk_value.find("}"));

  // paragraph island styling

  cout << "\n";
  
  for (int i = 0; i < 31; i++) {
    cout << "-+";
  }

  cout << "\n\n";
  cout << text_value + "\n\n";

  cout << chunk_value2 + "\n\n";

  for (int i = 0; i < 31; i++) {
    cout << "-+";
  }
}