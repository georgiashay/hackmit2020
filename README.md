# hackMIT2020: Byte-Size Footprint

Byte-Size Footprint is a mobile food-tracking app that lets you see the carbon footprint of what you're eating.  It draws on the [dataFIELD](http://css.umich.edu/page/datafield?fbclid=IwAR1PZPnfihvdQAm4h7tcNdeRrCH1v5v5iMSF3-O8OMj07HHG5Xx1VFiM_JA) database that contains the carbon impact of a large number of raw ingredients.

## To Run the API:

Navigate to the greenhack/src/server folder.  To set it up for the first time, run:

```npm install```

in a terminal window.  Then provide a creds.json file in the server folder which contains the username and password (in a json object) of a database containing the carbon footprint data.

Then, to start up the API, run:

```node server.js```.

## To Run the App

If you are running the API yourself, in the constants.ts file, change the FOOD_SERVER location to wherever the API is running (likely localhost:8080).

Run ```npm install``` to set up the app.  Then, to run the app in a web browser run ```ionic serve```.

