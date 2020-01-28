import React, { useState, useEffect } from 'react';
import Cell from 'containers/Cell';
export default function Board({ row, col }) {
  const [cells, setCells] = useState([[]]);
  useEffect(() => {
    // 创建对应大小的二维数组
    const arr = new Array(row)
      .fill(0)
      .map(() => new Array(col).fill(0).map((_v, i) => i));
    setCells(arr);
    return () => {
      setCells(null);
    };
  }, [col, row]);
  return cells.map((_v, i) => (
    <div className="row" key={i}>
      {cells[i].map((u, j) => (
        <Cell key={u} row={i} col={j} />
      ))}
    </div>
  ));
}
