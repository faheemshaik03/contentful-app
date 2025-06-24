import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  blocks: string[];
  history: string[][];
  historyIndex: number;
}

const initialState: LayoutState = {
  blocks: [],
  history: [[]],
  historyIndex: 0,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setBlocks(state, action: PayloadAction<string[]>) {
      state.blocks = action.payload;
      // Save to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(action.payload);
      state.historyIndex++;
    },
    addBlock(state, action: PayloadAction<string>) {
      const newBlocks = [...state.blocks, action.payload];
      state.blocks = newBlocks;
      // Save to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(newBlocks);
      state.historyIndex++;
    },
    undo(state) {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.blocks = state.history[state.historyIndex];
      }
    },
    redo(state) {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.blocks = state.history[state.historyIndex];
      }
    },
  },
});

export const { setBlocks, addBlock, undo, redo } = layoutSlice.actions;
export default layoutSlice.reducer;
