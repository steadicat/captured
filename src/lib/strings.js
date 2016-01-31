
export function trimPathEnd(path) {
  const bits = path.split('/');
  if (bits.length === 2) return '/';
  return bits.slice(0, bits.length - 1).join('/');
}

export function humanizeLink(link) {
  return link.replace(/^https?:\/\/(www\.)?/, '');
}

export function lowercaseFirst(s) {
  if (s.length <= 1) return s.toLowerCase();
  return s.substring(0, 1).toLowerCase() + s.substring(1);
}

export function uppercaseFirst(s) {
  if (s.length <= 1) return s.toUpperCase();
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}
