# DART React App

## Introduction

This app is developed as part of the FEND (Front End Nanodegree) track from Udacity and pretends to show the knowledge on how to develop and implement modern day SPA's that include asynchornous API calls.

The app will feature a map with 3rd party information about the DART Trains in Ireland.

## How to run the app

In order to run the app you will have to build the app.

You can do so by running the following command:

`npm install --save google-maps-react escape-string-regexp sort-by prop-types`

after this run

`npm install`

`npm run build`

In order to run the app you will need to build it using:

`npm run build`

`serve -s build`

You will need to access: http://localhost:5000

this will run the app in your local computer


## Responsive Design

The app uses a responsive design and break points for smaller devices. The modals used use dynamic units.

## Offline

The app will feature the usage of a service worker to cache visited pages and make these available offline.

Be sure to build the app before testing the service worker.

`npm run build`

`serve -s build`

You will need to access: http://localhost:5000

## Dependencies (packages)

- PropTypes
- Google-Maps-React
- Sort-By
- Escape-String-Regexp

You will need to use npm install to install all of the above packages.

## External Dependencies / Data Sources

- [Google Maps API](https://cloud.google.com/maps-platform/)
- [Foursquare API](https://foursquare.com/)

All API calls are done asynchronously using the fetch API.

## Contributing

If you have ideas on how to improve the app and would like to contribute to make it better, see CONTRIBUTING.md
