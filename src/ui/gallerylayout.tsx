import {linear} from '../lib/math';
import data from '../data';

const PIECES_BY_ID = {};

data.forEach(piece => {
  PIECES_BY_ID[piece.id] = piece
});

export function columns(width) {
  return Math.round(linear(320, 2, 1800, 6, width));
}

export function gutter(width) {
  return width < 760 ? 12 : 24;
}

export function margins(width) {
  return width < 760 ? 24 : 48;
}

export function chinHeight(width) {
  return width < 760 ? 112 : 72;
}

export function columnWidth(width) {
  const n = columns(width);
  return Math.round(((width - 2 * margins(width)) - (n - 1) * gutter(width)) / n);
}

function minIndex(list) {
  let minValue = Infinity;
  let min = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i] < minValue) {
      minValue = list[i];
      min = i;
    }
  };
  return min;
}

export function toColumns(pieces, width) {
  const n = columns(width);
  const result = new Array(n);
  const heights = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = [];
    heights[i] = 0;
  }
  const w = columnWidth(width);
  const g = gutter(width);
  for (let piece of pieces) {
    const shortest = minIndex(heights);
    heights[shortest] += w * piece.size[1] / piece.size[0] + chinHeight(width) + g;
    result[shortest].push(piece);
  }
  return result;
}

export function getPieceMargin(width) {
  return Math.round((width - Math.min(960, width - 2 * margins(width))) / 2);
}

export function idFromPath(path) {
  const id = path.split('/')[1];
  return PIECES_BY_ID[id] ? id : null;
}

export function isCurrent(path, piece) {
  return idFromPath(path) === piece.id;
}

export function isExpanded(path) {
  return !!idFromPath(path);
}

export function isReferences(path) {
  return isExpanded(path) && path.split('/')[2] === 'references';
}

export function isContact(path) {
  let piece = getCurrentPiece(path);
  return piece && piece.artistContact && path.split('/')[2] === 'contact';
}

export function pieceById(id) {
  return PIECES_BY_ID[id];
}

export function getCurrentPiece(path) {
  return pieceById(idFromPath(path));
}

export function getThumbnailSize(piece, {width, height}) {
  const imageRatio = piece.size[0] / piece.size[1];
  return [columnWidth(width), Math.round(columnWidth(width) / imageRatio)];
}

export function getFullScreenSize(piece, {width, height}) {
  height -= 46; // Height of toolbar
  const screenRatio = width / height;
  const imageRatio = piece.size[0] / piece.size[1];
  const fullScreenWidth = imageRatio > screenRatio ? width : (height * imageRatio);
  return [Math.round(fullScreenWidth), Math.round(fullScreenWidth / imageRatio)];
}

export function getSize(piece, current, {width, height}) {
  return (current ? getFullScreenSize : getThumbnailSize)(piece, {width, height});
}

export function getOriginalSize(piece, {pixelRatio}) {
  return [
    Math.round(piece.size[0] / 4),
    Math.round(piece.size[1] / 4),
  ];
}

export function getScale(piece, current, hovered, {width, height}) {
  if (current) {
    const [fullScreenWidth] = getFullScreenSize(piece, {width, height});
    return fullScreenWidth / columnWidth(width);
  }
  return hovered ? 1.05 : 1;
}
