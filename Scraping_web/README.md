# Indroduktion
I mitt projekt har jag skrapat [svenska turistföreningen](https://www.svenskaturistforeningen.se/guider-tips/leder/). Tanken är att skrapa ned alla leder och sådan information som kan vara bra att ha, t.ex längd och antal etapper, så att man kan välja sin vandring utifrån det. När man väl har valt en led som har en bra läng kan man gå in just denns sida på svenska turistföreningen för att få mer information.  
<br />


## Installera puppeteer
1.
```
mkdir first-puppeteer-scraper-example
```
2.
```
npm init -y
```
3. Din package.json borde se ut så här
```
{
  "name": "first-puppeteer-scraper-example",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "puppeteer": "^19.6.2"
  },
  "type": "module",
  "description": "",
  "types": "module"
}
```
4.
```
npm install puppeteer
```
<br />

## Skrapa
1. Du ska hamna i Scraping_code så beroende på var du är ska du antingen bara köra
```
cd Scraping_code
```
eller så måste du köra innan
```
cd Scraping_web
```
2.
```
node index.js
```
<br />

## Project Setup
1. Du ska hamna i Scraping_web så antingen måste du skriva
```
cd Scraping_web
```
eller
```
cd..
```
2.
```
npm install
```
3.
```
npm run dev
```
<br />

## Problem
## Förbättringar

