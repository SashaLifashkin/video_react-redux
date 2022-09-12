import { createSlice } from '@reduxjs/toolkit';

type Position = {
  x: number;
  y: number;
};

const startPosition: Position = { x: 0, y: 0 };

const positionSlice = createSlice({
  name: 'position',
  initialState: startPosition,
  reducers: {
    moveLeft: position => ({ ...position, x: position.x - 1 }),
    moveRight: position => ({ ...position, x: position.x + 1 }),
    moveUp: position => ({ ...position, y: position.y - 1 }),
    moveDown: position => ({ ...position, y: position.y + 1 }),
  },
});

export default positionSlice.reducer;
export const { actions } = positionSlice;