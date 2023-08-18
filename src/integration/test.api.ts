import { TestData } from '../store/slices/orderInfoSlice';

export const fetchTestData = async () => {
  const data: TestData = {
    name: 'test',
    age: 30,
  };

  return data;
};
