#include <SPI.h>
#include <SD.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ST7735.h>
#include <Adafruit_seesaw.h>
#include <Adafruit_TFTShield18.h>
#include <SoftwareSerial.h>

Adafruit_TFTShield18 ss;

#define SD_CS    4
#define TFT_CS  10
#define TFT_DC   8
#define TFT_RST  -1

SoftwareSerial tfLunaSerial(3, -1);
Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC, TFT_RST);

// Datos LiDAR
int lidarDist = 0;
int lidarStrength = 0;

// Memoria
int savedDist[3] = {0, 0, 0};
int selectedSlot = -1;

// Variables para evitar parpadeo
int lastLidarDist = -1;
int lastSavedDist[3] = {-1, -1, -1};
int lastSelectedSlot = -2;
int lastFooterState = -1;

void setup(void) {
  Serial.begin(9600);

  if (!ss.begin()){
    Serial.println("seesaw error");
    while(1);
  }

  ss.setBacklight(TFTSHIELD_BACKLIGHT_OFF);
  ss.tftReset();

  tft.initR(INITR_BLACKTAB);
  tft.fillScreen(ST77XX_BLACK);

  // Encendido gradual
  for (int32_t i=0; i<TFTSHIELD_BACKLIGHT_ON; i+=500) {
    ss.setBacklight(i);
    delay(1);
  }

  tfLunaSerial.begin(115200);

  // Dibujar UI estática UNA SOLA VEZ
  drawStaticUI();
}

void loop() {
  readTFLuna();
  readButtons();
  updateUI();  // ahora es inteligente (sin parpadeo)
}

// -----------------------------
// LECTURA LiDAR
// -----------------------------
void readTFLuna() {
  while (tfLunaSerial.available() >= 9) {
    if (tfLunaSerial.read() != 0x59) continue;
    if (tfLunaSerial.peek() != 0x59) continue;

    uint8_t data[9];
    data[0] = 0x59;
    for (int i = 1; i < 9; i++) data[i] = tfLunaSerial.read();

    uint8_t checksum = 0;
    for (int i = 0; i < 8; i++) checksum += data[i];

    if (checksum == data[8]) {
      lidarDist = data[2] + (data[3] << 8);
      lidarStrength = data[4] + (data[5] << 8);
    }
  }
}

// -----------------------------
// BOTONES
// -----------------------------
void readButtons() {
  uint32_t buttons = ss.readButtons();

  if (!(buttons & TFTSHIELD_BUTTON_1)) selectedSlot = 0;
  if (!(buttons & TFTSHIELD_BUTTON_2)) selectedSlot = 1;
  if (!(buttons & TFTSHIELD_BUTTON_3)) selectedSlot = 2;

  if (!(buttons & TFTSHIELD_BUTTON_IN)) {
    if (selectedSlot != -1) {
      savedDist[selectedSlot] = lidarDist;
    }
  }
}

// -----------------------------
// UI ESTÁTICA (NO PARPADEA)
// -----------------------------
void drawStaticUI() {
  tft.setTextColor(ST77XX_CYAN);
  tft.setTextSize(1);
  tft.setCursor(5, 5);
  tft.print("DISTANCIA EN VIVO:");

  tft.drawFastHLine(0, 50, 128, ST77XX_WHITE);

  tft.setCursor(5, 55);
  tft.setTextColor(ST77XX_YELLOW);
  tft.print("MEMORIAS (1, 2, 3):");
}

// -----------------------------
// UI DINÁMICA (SOLO CAMBIOS)
// -----------------------------
void updateUI() {

  // --- DISTANCIA EN VIVO ---
  if (lidarDist != lastLidarDist) {
    tft.fillRect(5, 18, 118, 28, ST77XX_BLACK);

    tft.setCursor(5, 20);
    tft.setTextColor(ST77XX_WHITE);
    tft.setTextSize(3);
    tft.print(lidarDist);
    tft.setTextSize(1);
    tft.print(" cm");

    lastLidarDist = lidarDist;
  }

  // --- MEMORIAS ---
  for (int i = 0; i < 3; i++) {
    bool active = (selectedSlot == i);

    if (savedDist[i] != lastSavedDist[i] || active != (lastSelectedSlot == i)) {
      drawMemoryLine(i, active);
      lastSavedDist[i] = savedDist[i];
    }
  }

  lastSelectedSlot = selectedSlot;

  // --- FOOTER ---
  int state = (selectedSlot == -1) ? 0 : 1;

  if (state != lastFooterState) {
    tft.fillRect(0, 145, 128, 15, ST77XX_BLACK);

    tft.setCursor(5, 148);
    tft.setTextSize(1);

    if (state == 0) {
      tft.setTextColor(ST77XX_WHITE);
      tft.print("Pulsa boton 1, 2 o 3");
    } else {
      tft.setTextColor(ST77XX_MAGENTA);
      tft.print("Joystick p/ capturar");
    }

    lastFooterState = state;
  }
}

// -----------------------------
// DIBUJAR MEMORIA
// -----------------------------
void drawMemoryLine(int id, bool active) {
  int y = 70 + (id * 25);

  if (active) {
    tft.fillRect(0, y - 2, 128, 18, ST77XX_BLUE);
    tft.setTextColor(ST77XX_WHITE);
  } else {
    tft.fillRect(0, y - 2, 128, 18, ST77XX_BLACK);
    tft.setTextColor(ST77XX_GREEN);
  }

  tft.setCursor(5, y);
  tft.setTextSize(1);

  tft.print("M");
  tft.print(id + 1);
  tft.print(":");

  tft.setCursor(60, y);

  if (savedDist[id] == 0) {
    tft.print("---");
  } else {
    tft.print(savedDist[id]);
    tft.print(" cm");
  }
}