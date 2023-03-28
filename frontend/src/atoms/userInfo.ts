import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 1. 아무것도 설정 안 하고 쓰는 경우
// localStorage에 저장되며, key 이름은 'recoil-persist'로 저장됨
const { persistAtom } = recoilPersist();

interface User {
  userPk: number;
  userEmail: string;
}

// Recoil-persist를 적용시키려면 아래의 effects_UNSTABLE을 적어주어야 한다.
// eslint-disable-next-line import/prefer-default-export
export const userInfo = atom<User>({
  key: 'user',
  default: {
    userPk: 0,
    userEmail: '',
  },
  effects_UNSTABLE: [persistAtom],
});
