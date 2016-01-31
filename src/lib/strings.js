
export function trimPathEnd(path) {
  const bits = path.split('/');
  if (bits.length === 2) return '/';
  return bits.slice(0, bits.length - 1).join('/');
}

export function humanizeLink(link) {
  return link.replace(/^https?:\/\/(www\.)?/, '');
}
