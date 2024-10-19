import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ICountry {
  id: number;
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

interface ICountryState {
  countries: ICountry[];
  isLoading: boolean;
}

const initialState: ICountryState = {
  countries: [],
  isLoading: false,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<ICountry[]>) {
      state.countries = action.payload;
      state.isLoading = false;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {setCountries, setIsLoading} = countrySlice.actions;

export default countrySlice.reducer;
