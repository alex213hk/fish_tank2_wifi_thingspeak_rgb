input.onButtonPressed(Button.A, function () {
    strip.clear()
    strip.show()
})
input.onButtonPressed(Button.B, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Purple))
})
function wifi () {
    while (!(esp8266.isWifiConnected())) {
        esp8266.connectWiFi("IOT", "12345679")
        if (esp8266.isWifiConnected()) {
            basic.showIcon(IconNames.Happy)
        } else {
            basic.showIcon(IconNames.Sad)
        }
        basic.pause(5000)
    }
}
let strip: neopixel.Strip = null
basic.showIcon(IconNames.Heart)
strip = neopixel.create(DigitalPin.P1, 20, NeoPixelMode.RGB)
strip.setBrightness(95)
strip.clear()
strip.showColor(neopixel.colors(NeoPixelColors.Purple))
esp8266.init(SerialPin.P14, SerialPin.P15, BaudRate.BaudRate115200)
if (esp8266.isESP8266Initialized()) {
    basic.showIcon(IconNames.Yes)
} else {
    basic.showIcon(IconNames.No)
}
ModulePlus.ds18init(DigitalPin.P2)
let upload = 0
let W_temperature = 0
basic.forever(function () {
    W_temperature = ModulePlus.DSTemperature(DigitalPin.P2)
    basic.showNumber(W_temperature)
    if (!(esp8266.isWifiConnected())) {
        wifi()
    }
    esp8266.uploadThingspeak(
    "GO2BIUT0WQFHA1GD",
    input.lightLevel(),
    input.temperature(),
    W_temperature
    )
    if (esp8266.isThingspeakUploaded()) {
        upload += 1
        basic.showNumber(upload)
    }
    basic.pause(15 * 60 * 1000)
})
