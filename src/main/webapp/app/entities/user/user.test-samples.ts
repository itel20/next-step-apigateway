import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 'd76646c7-5d82-45b3-8686-f7bbde80cfad',
  login: 'zv`=@WhZ\\1rRX4Am\\<w0x5B\\)DZHbSK\\cSR',
};

export const sampleWithPartialData: IUser = {
  id: '082a5a14-5375-48bc-8722-d218fe39e467',
  login: 'Ihn_s.',
};

export const sampleWithFullData: IUser = {
  id: '17207c20-0c2a-4516-8080-dcdc44629237',
  login: 'pv',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
