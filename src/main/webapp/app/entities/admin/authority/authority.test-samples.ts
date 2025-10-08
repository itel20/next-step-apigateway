import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '4d1fc379-e6bd-4b9b-ae1a-5a8679d605b5',
};

export const sampleWithPartialData: IAuthority = {
  name: 'eee47edf-004b-4f9e-890b-ae026e3d9f7e',
};

export const sampleWithFullData: IAuthority = {
  name: '2e68bc90-ebbd-43d2-9922-eb67b03a523a',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
