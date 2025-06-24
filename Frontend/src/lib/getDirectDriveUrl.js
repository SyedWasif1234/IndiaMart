export const getDirectDriveUrl = (sharedURL) => {
  const match = sharedURL.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  return match
    ? `https://drive.google.com/uc?export=view&id=${match[1]}`
    : sharedURL; // fallback to original if it doesn't match
};
