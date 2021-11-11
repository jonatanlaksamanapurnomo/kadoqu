const subtractSet = (set, subtractionSet) => {
  if (!(set.size || subtractionSet.size)) return new Set();
  if (!subtractionSet.size) return set;
  if (!set.size) return new Set();
  return new Set([...set].filter(el => !subtractionSet.has(el)));
};

export { subtractSet };
