import api from '../api/follow';

const FollowViewModel = () => {
  const follow = async (fromId: number, toId: number) => {
    const res = await api.followAdd(fromId, toId);
    return res;
  };

  const unfollow = async (fromId: number, toId: number) => {
    const res = await api.followDelete(fromId, toId);
    return res;
  };
  return { follow, unfollow };
};

export default FollowViewModel;
