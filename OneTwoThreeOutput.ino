

/*
 * Author: DEBUF Xavier,
 * Date:2017/10/10
 * 
 */
#include <LiquidCrystal.h>
#include <dht11.h> 
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
int water = A0;
int val=0;
int count=0;
int photocellPin = A1;
                 
dht11 DHT;                  //Note: DHT on behalf of the DHT11 sensor 
const int dht11_data = 8;     //Please put the DH11`s dht11_data pin connect with arduino digital Port 6
int temp=0;
int hum=0;

void setup()                                                                                     
{
  Serial.begin(9600);
  lcd.begin(16,2);
  lcd.print("Smart Pergolas");
  lcd.setCursor(0,1);
 lcd.print("ready to use");
  delay(2000);
  lcd.clear();
}
void clearnSet(){
  lcd.clear();                 //clear display
  lcd.print("Smart Pergolas");
  lcd.setCursor(0, 1) ;
}
void dataToPrint(int i,int data){
  clearnSet();
  switch (i){
  case 1 :
  for (int t=0;t<10;t++){
  clearnSet();
  lcd.print("pluie");          
  lcd.print(data);
  delay(150);
  }
  break;
  
  case 2 :
  for (int t=0;t<10;t++){
  
  clearnSet();
  lcd.print("humidite ");
  lcd.print(data);
  delay(150);
  }break;
  
  case 3 :
  for (int t=0;t<10;t++){
  clearnSet();
  
  lcd.print("temperature C ");
  lcd.print(data);
  delay(150);
  }break;
  
  case 4 :
  for (int t=0;t<10;t++){
  clearnSet();
  lcd.print("lumiere lm");
  lcd.print(data);
  delay(150);
  }
  break;
  }
  
  
}

void loop()
{ 
  val=analogRead(water);
  if(val>220)
  count=val/2.2;
  else
  count=0;
  
  dataToPrint(1,count);
  DHT.read(dht11_data);
  temp=DHT.temperature;
  hum=DHT.humidity;
  
 dataToPrint(2,hum);
 dataToPrint(3,temp);
   
  int lumg = analogRead(photocellPin);  
  dataToPrint(4,lumg);
}
/*
Serial.print("Hum=\t%");            
  Serial.print(hum);
  Serial.print("\tTemp=\t");            
  Serial.println(temp);
*/
