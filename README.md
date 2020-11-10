# Padlet Map

![Node.js CI/CD with Vue.js](https://github.com/nvdai2401/padlet-map/workflows/CI/CD/badge.svg)

> This is a map of countries I would like to visit.

Visit the map: <https://nvdai2401.github.io/padlet-map/>

The idea behind this app comes from [Padlet Map](https://padlet.com/gallery/countries_visited_map). I knew this map via Padlet job description with the special introduction of this map like this.

> Frontend is the part of our stack we push the most to the limits. Checkout Padlet Maps (padl.et/map). A lot of frontend magic made them possible. Maps like these have never been done before.

That why I decided to rebuild this app to explore the front-end magic that they mentioned.
The magic behinds the scene

- Image:
  - Use different image sizes for different posts and screen size
  - Optimize perceived loading time by using lazy loading image technique. The server analyzes the images to extract essential properties for the lazyloading images on the client side and then put them into `preview_image` field, such as colors, height, width,...
- Map:
  - Fit bounds at the initial render
  - Customize map styles, map control (zoom in, zoom out, fit bounds)
- Responsive app:
  - Use server-side rendering for rendering the expanded post, I think Padlet wants to make the post friendly with SEO and the post can be shared publicly so that why they use server-side rendering.
  - This map works well on both mobile and desktop.

## Requirements

- [node 12+](https://nodejs.org/en/)

## Tech stack

- Front-end: Vue.js, [gmap-vue](https://github.com/diegoazh/gmap-vue), SCSS
- Testing: Jest, vue-test-utils
- Tools: [ImageKit](https://imagekit.io/)

## Installation guide

1. Download zip file or type this command into your terminal `git clone git@github.com:nvdai2401/padlet-map.git`
2. Run `yarn` to install essential dependencies
3. Run `yarn serve` to start the web app. The app will run at `localhost:8080`
4. Run `yarn test:unit` to run unit tests.

## Demo pictures

<p align="center"><img src="/images/map.PNG" /></p>
<p align="center"><img src="/images/post_expanded.PNG" /></p>
