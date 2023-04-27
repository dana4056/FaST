import { v4 } from 'uuid';

const uuid = () => {
  const tokens = v4().split('-');
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

export default uuid;
