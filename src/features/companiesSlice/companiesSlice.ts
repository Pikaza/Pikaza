import { RootState } from 'src/app/store';
import { createSlice } from '@reduxjs/toolkit';

export type CompaniesState = string[];

const initialState: CompaniesState = [];

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    companyAdded(state, action) {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
  },
});

export const selectAllCompanies = (state: RootState) => state.companies;
export const { companyAdded } = companiesSlice.actions;
export default companiesSlice.reducer;
