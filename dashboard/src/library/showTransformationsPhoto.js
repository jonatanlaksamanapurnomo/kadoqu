function showTransformationsPhoto(width, height, photoPath) {
  if (photoPath === undefined) return "";
  if (photoPath.length >= 1500) {
    return photoPath;
  }
  let url = `${process.env.REACT_APP_IMAGEKIT_BASE_URL}/tr:w-${width},h-${height}/${photoPath}`;
  return url;
}

export default showTransformationsPhoto;
