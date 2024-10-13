import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';

export const modalStateSelector = (state: RootState) => state.modal;

export const modalSelector = createSelector(modalStateSelector, (modal) => ({
  open: modal.open,
  name: modal.name,
}));