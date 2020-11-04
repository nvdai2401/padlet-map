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

const generateSrcSet = (url) => {
  const breakPoints = [180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048];
  let srcSet = '';

  for (let i = 0; i < breakPoints.length; i++) {
    srcSet += `${url}?tr:w-${breakPoints[i]} ${breakPoints[i]}w`;
    srcSet += i < breakPoints.length - 1 ? ', ' : '';
  }

  return srcSet;
};

export {
  POST_WIDTH,
  POST_EXPANDED_WIDTH,
  calculatePlaceholderHeight,
  generateGmapSearchUrl,
  generateSrcSet,
};
