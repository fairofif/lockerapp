#include <WiFi.h>
#include <HTTPClient.h>

#define BUTTON_PIN 16 // ESP32 pin GIOP16, which connected to button
#define LED_PIN 18    // ESP32 pin GIOP18, which connected to led

const char* ssid = "aldifad";        // replace with your network SSID
const char* password = "happynewyear"; // replace with your network password

const char* url = "https://wakacipuy.my.id/lockerapi/getCondition/L01"; // API URL for GET request
const char* plusurl = "https://wakacipuy.my.id/lockerapi/changeCondition/L01/1"; // API URL for POST request
const char* minurl = "https://wakacipuy.my.id/lockerapi/changeCondition/L01/0"; // API URL for POST request

bool currentCondition = false; // current condition of locker L01, initially set to false

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
  // read the state of the button value:
  int buttonState = digitalRead(BUTTON_PIN);

  // handle button press
  if (buttonState == LOW) {
    // toggle the current condition and update the API
    if (currentCondition) {
      currentCondition = false;
      sendPostRequest(minurl);
    } else {
      currentCondition = true;
      sendPostRequest(plusurl);
    }

    // update the LED to reflect the current condition
    digitalWrite(LED_PIN, currentCondition);
  }

  // GET request
  HTTPClient http;

  Serial.print("Sending GET request to ");
  Serial.println(url);

  http.begin(url);
  int httpCode = http.GET();

  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println("Response:");
    Serial.println(payload);

    // parse the response and update the current condition
    if (payload == "1") {
      currentCondition = true;
    } else if (payload == "0") {
      currentCondition = false;
    }
  } else {
    Serial.println("Error in GET request");
  }

  http.end();

  // control LED according to the state of the button and the current condition
  if (buttonState == LOW) {
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, currentCondition);
  }
}

void sendPostRequest(const char* url) {
  HTTPClient http;

  http.begin(url);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCode = http.POST("locker=L01");

  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println("Response:");
    Serial.println(payload);
  } else {
    Serial.println("Error in POST request");
  }

  http.end();
}
