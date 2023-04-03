import api from '../api/user';

const UserViewModel = () => {
  const getMyData = async (id: number) => {
    const res = await api.getMyData(id);
    return res;
  };
  return { getMyData };
};

export default UserViewModel;
