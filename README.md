# Visify

This repository contains all of the code for Visify, a web application that visualizes your Spotify listening history. 

## Contents

All relevent code is inside of the `/visify-final` directory. 

- `/data-prep` contains all of the code used for data engineering. Most of this was then transferred into the final application. 
- `/src` contains all of the code of our React application. 
  - The `/components` directory contains the components of our React application. This is where all of the code that we wrote is.  `MainPage.js` is the component for the main page. `SongVis.js` and `RelatedArtists.js` are the components for the two main views in our application. s
- `/final-project-proposal` contains the proposal of our project, including initial sketches. 
- `/archive` contains old/unused code. 

## Notes

- Spotify limits the number of requests that you make to the API. Sometimes, Visify will begin to load and then will stop because it has hit the rate limit. If this is the case, you need to wait for a minute and then reload the page. Alternatively, you can use the sample data. 
- There is a feature that plays the audio of your top song in the loading screen. This feature only works in Chrome or Chromium based browsers. 

## Technologies Used

We used a number of technologies to create this application. The main ones were:

- The [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [ReactJs](https://reactjs.org/)
- [D3.js](https://d3js.org/)
- [React Scrollable List](https://github.com/jwarning/react-scrollable-list)
- [ReactJS Popup](https://www.npmjs.com/package/reactjs-popup)
- [Spotify Web API JS](https://www.npmjs.com/package/spotify-web-api-js)

## Links

- [Link to the Visify website](https://washuvis.github.io/visify/)
- [Link to our Process Book](https://washuvis.github.io/visify/processBook.html)
- [Link to our demo](https://www.youtube.com/watch?v=-uCqYlTNXws&feature=youtu.be&ab_channel=AustinTolani)

