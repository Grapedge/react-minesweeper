import React, { useEffect } from 'react';
import Board from 'components/Board';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { newGame } from './GameRedux';

export default function Game() {
  const dispatch = useDispatch();
  const game = useSelector(state => state.game);
  useEffect(() => {
    dispatch(newGame(10, 10, 10));
  }, [dispatch]);
  const { row, col } = game.config;
  return (
    <div>
      <Button
        onClick={() => {
          dispatch(newGame(10, 10, 50));
        }}
      >
        新游戏
      </Button>
      <Board row={row} col={col} />
    </div>
  );
}
