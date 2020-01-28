import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { coverCell } from './CellRedux';
import { CELL_MINE } from '../constants/game';

export default function Cell({ row, col }) {
  const dispatch = useDispatch();
  const cell = useSelector(state => state.game.cells[row][col]);
  const cover = useCallback(() => {
    dispatch(coverCell(row, col));
  }, [col, dispatch, row]);
  return (
    <div className={'cell' + (cell.cover ? ' cover' : '')} onClick={cover}>
      {cell.cover
        ? cell.type === CELL_MINE
          ? '*'
          : cell.mineCount > 0
          ? cell.mineCount
          : ' '
        : null}
    </div>
  );
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired
};
