# Vue Google Map

> This is a map of countries I would like to visit.

Visit the map: <https://nvdai2401.github.io/vue-gmap/>

The idea behind this app comes from [Padlet Map](https://padlet.com/gallery/countries_visited_map). I knew this map via Padlet job description with the special introduction of this map like this.

> Frontend is the part of our stack we push the most to the limits. Checkout Padlet Maps (padl.et/map). A lot of frontend magic made them possible. Maps like these have never been done before.

That why I decided to rebuild this app to explore the frontend magic.
The magic behinds the scene

- Image:
  - Use different image size for different post and screen size
  - OPTIMIZE PERCEIVED LOADING TIME by use lazy loading image and background color
- Map
  - Auto fitbounds at the initial mount
- Responsive app

## Requirements

- [node 12+](https://nodejs.org/en/)

## Tech stack

- Front-end: Vue.js, [gmap-vue](https://github.com/diegoazh/gmap-vue), SCSS
- Testing: Jest, vue-test-utils
- Tools: [ImageKit](https://imagekit.io/)

## Installation guide

1. Download zip file or type this command into your terminal `git clone git@github.com:nvdai2401/vue-gmap.git`
2. Run `yarn` to install essential dependencies
3. Run `yarn start` to start the web app. The app will run at `localhost:8080`
4. Run `yarn test:unit` to run unit tests.
