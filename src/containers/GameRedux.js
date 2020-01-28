import {
  GAME_IDLE,
  GAME_START,
  GAME_OVER,
  GAME_WIN,
  CELL_NORMAL,
  CELL_MINE
} from 'constants/game';
import { CELL_COVER } from '../constants/game';
import { offsets, bfsCell } from './CellRedux';

const initialState = {
  status: GAME_IDLE, // 游戏状态
  config: {
    row: 0, // 行数
    col: 0, // 列数
    minCount: 0 // 地雷数
  }, // 游戏配置
  cells: [[]] // 游戏网格
};

/**
 * 创建新游戏
 * @param {*} row 行数
 * @param {*} col 列数
 * @param {*} minCount 地雷数
 */
export const newGame = (row, col, minCount) => {
  // 创建棋盘
  const cells = new Array(row).fill(0).map(() =>
    new Array(col).fill(0).map(() => ({
      type: CELL_NORMAL,
      flag: false, // 是否插旗
      mineCount: 0, // 周围八格地雷数
      cover: false // 是否被翻开
    }))
  );
  // 生成地雷：洗牌算法
  const seq = new Array(row * col).fill(0).map((_v, i) => i);
  for (let i = seq.length - 1; i > 0; --i) {
    const r = Math.floor(Math.random() * i);
    [seq[i], seq[r]] = [seq[r], seq[i]];
  }
  const addCellMineCount = (r, c) => {
    if (r >= 0 && r < row && c >= 0 && c < col) {
      ++cells[r][c].mineCount;
    }
  };

  for (let i = 0; i < minCount; ++i) {
    const r = Math.floor(seq[i] / col);
    const c = Math.floor(seq[i] % col);
    cells[r][c].type = CELL_MINE;
    offsets.map(offset => {
      addCellMineCount(r + offset[0], c + offset[1]);
      return offset;
    });
  }
  // 返回 action
  return {
    type: GAME_START,
    row,
    col,
    cells
  };
};

// Reducer
export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_START:
      return {
        ...state,
        status: GAME_START,
        config: {
          row: action.row,
          col: action.col,
          mineCount: action.mineCount
        },
        cells: action.cells
      };
    case GAME_OVER:
      return {
        ...state,
        status: GAME_OVER
      };
    case GAME_WIN:
      return {
        ...state,
        status: GAME_WIN
      };
    case GAME_IDLE:
      return {
        ...state,
        status: GAME_IDLE
      };
    case CELL_COVER:
      const cells = [...state.cells];
      cells[action.row][action.col].cover = true;
      if (cells[action.row][action.col].type === CELL_NORMAL)
        bfsCell(action.row, action.col, cells);
      return {
        ...state,
        cells
      };
    default:
      return state;
  }
}
