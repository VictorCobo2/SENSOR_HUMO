int buzzer = 11;
int sensorA0 = A0;


int umbral = 393;

void setup() {
 pinMode(buzzer, OUTPUT);
 pinMode(sensorA0, INPUT);
 Serial.begin(9600);

}

void loop() {
  int lecturaSensor = analogRead(sensorA0);

  Serial.println(lecturaSensor);

  if (lecturaSensor > umbral) {
    tone(buzzer, 2000); 
    delay(500); 
    noTone(buzzer); 
    delay(500); 
  } else {
    noTone(buzzer);
  }
  delay(1000);
}
