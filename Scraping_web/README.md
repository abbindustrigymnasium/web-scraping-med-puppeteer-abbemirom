# Indroduktion
I mitt projekt har jag skrapat [svenska turistföreningen](https://www.svenskaturistforeningen.se/guider-tips/leder/). Tanken är att skrapa alla leder och sådan information som kan vara bra att ha, t.ex längd och antal etapper. Då kan man välja sin vandring utifrån det. All skrapad data sparas i en JSON-fil. När man väl har valt en led som har en bra längd kan man gå in just denns sida på svenska turistföreningen för att få mer information. För att skrapa har jag använt [puppeteer](https://pptr.dev/). För att skapa min hemsida har jag använt ramverket [vue](https://vuejs.org/) och css-biblioteket [tailwind](https://tailwindcss.com/).
<br />

## Systemkrav
- node v18
- npm v9


<br />

## Skrapa
### 1. 
Klona projektet från `git@github.com:abbindustrigymnasium/web-scraping-med-puppeteer-abbemirom.git`
### 2.
Öppna roten av projektet i ett kommandofönster.
Gå till mapen Scraping_code:
```
cd Scraping_code
```
### 3.
kör filen index.js:
```
node index.js
```
<br />

## Project Setup
### 4. 
Gå ur mappen Scraping_code:
```
cd..
```
### 5.
Installera paket:
```
npm install
```
### 6.
Kör webbsidan i en lokal webbläsare:
```
npm run dev
```
Öppna länken som visas i kommandofönstet 


<br />

## Problem
När programet körs får jag inte ner all data. Detta beror på att webbsidan som jag scrapar har olika strukturer, på olika sidor. I koden letar jag efter en div som har en h4:a med ett visst innehåll. På vissa av sidorna finns inte div:en med h4:an med det innehållet. 

<br />

## Förbättringar:
### Sökfunktionen och sortering:
Just nu kan man söka på allt både informationen som är i div:en och titeln. Men min tanke är att man ska kunna sortera och söka utifrån längd och antal etapper och att det ska vara lite tydligare. Kanske att man kan checka av vilka kategorier man vill ha, så att bara det man vill ha visas.

### Funktion
Jag borde ha skapat en funktion för skrapandet. Just nu är det väldigt mycket upprepande i min kod.

## Licens
Projektet är licensierat under MIT-licens.
