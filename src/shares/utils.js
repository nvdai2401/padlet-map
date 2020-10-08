const POST_WIDTH = 254;

const calculatePlaceholderHeight = (width, height) => {
  return Math.floor(height / (width / POST_WIDTH));
};

export { calculatePlaceholderHeight };
