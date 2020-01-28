import { CELL_COVER } from '../constants/game';

export const coverCell = (row, col) => ({
  type: CELL_COVER,
  row,
  col
});

export const offsets = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

export const bfsCell = (r, c, cells = []) => {
  if (cells[r][c].mineCount !== 0) return;
  const row = cells.length;
  const col = (cells[0] && cells[0].length) || 0;
  const qs = [[r, c]];
  while (qs.length > 0) {
    const v = qs.shift();
    offsets.map(offset => {
      const nr = v[0] + offset[0];
      const nc = v[1] + offset[1];
      if (nr >= 0 && nr < row && nc >= 0 && nc < col && !cells[nr][nc].cover) {
        cells[nr][nc].cover = true;
        if (cells[nr][nc].mineCount === 0) {
          qs.push([nr, nc]);
        }
      }
      return offset;
    });
  }
  return cells;
};
