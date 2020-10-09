const POST_WIDTH = 254;
const POST_EXPANDED_WIDTH = 720;

const calculatePlaceholderHeight = (
  placeHolderWidth,
  placeHolderHeight,
  imageWidth,
) => {
  return Math.floor(placeHolderHeight / (placeHolderWidth / imageWidth));
};

const generateGmapSearchUrl = (place) =>
  `https://www.google.com/maps/search/?api=1&query=${place}`;

export {
  POST_WIDTH,
  POST_EXPANDED_WIDTH,
  calculatePlaceholderHeight,
  generateGmapSearchUrl,
};
