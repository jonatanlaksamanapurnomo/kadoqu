function showTransformationsPhoto(width, height, photoPath) {
  let url = `${process.env.REACT_APP_IMAGEKIT_BASE_URL}/tr:w-${width},h-${height}/${photoPath}`;
  return url;
}

export default showTransformationsPhoto;
