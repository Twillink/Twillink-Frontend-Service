import {ICountry} from '@/libs/store/features/countrySlice';

export const mappingCountryToDialOptions = (countries: ICountry[]) => {
  return countries
    .map(country => ({
      value: country.dialCode,
      label: country.dialCode,
      emoji: country.flag,
    }))
    .sort((a, b) => a.value.localeCompare(b.value));
};
