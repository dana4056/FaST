import { GroupProps } from '@react-three/fiber';

import { TagType } from './TagType';
import {
  CardDetailProps,
  CardListProps,
  InputPhotoProps,
  SearchBoxProps,
  InputProfileProps,
  UserProps,
  ProfileProps,
} from './ComponentPropsType';
import { CommentType } from './CommentType';
import { CardType } from './CardType';

// 메인 페이지 Props
export interface HomePageProps extends SearchBoxProps {
  // 왼쪽 카드 목록
  cardsLeft: Array<CardType>;
  // 오른쪽 카드 목록
  cardsRight: Array<CardType>;
}

// 새 카드 페이지 Props
export interface NewCardPageProps extends InputPhotoProps {
  // 태그 저장 배열
  tags: Array<TagType>;
  // 카드 내용
  description: string;

  // 카드 내용 변경 함수
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  // 카드 생성 함수
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

// 카드 상세 페이지 props
export interface CardDetailPageProps extends CardDetailProps {
  // 댓글 배열
  comments: Array<CommentType>;
  // 댓글창이 열려있는지
  isCommentOpen: boolean;
}

// 내 기록 페이지
export interface MyRecordPageProps
  extends SearchBoxProps,
    CardListProps,
    ProfileProps {}

export type MapPageProps = CardListProps;

interface Tag {
  tagName: string;
  color: string;
  index: number;
}
// 회원가입 페이지 Props=
export interface SignUpPageProps extends InputProfileProps {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;

  nameMessage: string;
  emailMessage: string;
  passwordMessage: string;
  passwordConfirmMessage: string;

  isEmail: boolean;
  isCheckEmail: boolean;
  isName: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;
  isSend: boolean;
  isOpen: boolean;

  tag: Array<Array<Tag>>;
  selectedTag: Array<string>;
  isChecked: Array<boolean>;

  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAuthNum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNickName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickCheckEmailCode: () => void;
  onClickSend: () => void;
  onClickNext: () => void;
  onClickComplete: () => void;
  onClickTag: (e: number, row: number) => void;
}

export interface LoginPageProps {
  goLogin: (event: React.FormEvent<HTMLFormElement>) => void;
  goKakaoLogin: () => void;
  goNaverLogin: () => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 회원정보수정 페이지 props
export interface UserModifyProps extends InputProfileProps, SearchBoxProps {
  // 태그 저장 배열
  // tags: Array<TagType>;

  email: string;
  name: string;
}

export interface FindPwdProps {
  email: string;
  password: string;
  passwordConfirm: string;

  emailMessage: string;
  passwordMessage: string;
  passwordConfirmMessage: string;

  isEmail: boolean;
  isCheckEmail: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;
  isSend: boolean;

  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAuthNum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickCheckEmailCode: () => void;
  onClickSend: () => void;
  onClickNext: () => void;
}

// FollowPage Props

export interface FollowPageProps {
  followList: UserProps;
}

export interface ModelType {
  model: (props: GroupProps) => React.ReactElement;
  cameraPosition: Array<number>;
}
export interface ModelPageProps {
  model: ModelType | undefined;
  name: string;
  description: string;
}

interface LandmarkProps extends ModelType {
  name: string;
  link: string;
}

export interface StampPageProps {
  models: Array<LandmarkProps>;
}
