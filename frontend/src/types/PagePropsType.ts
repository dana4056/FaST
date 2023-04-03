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
export interface HomePageProps extends SearchBoxProps, CardListProps {}

// 새 카드 페이지 Props
export interface NewCardPageProps extends InputPhotoProps {
  isModalOpen: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isFail: boolean;
  handleFailModalClose: () => void;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  // 태그 저장 배열
  customTags: Array<string>;
  autoTags: Array<string>;

  textareaRef: React.RefObject<HTMLTextAreaElement>;
  // 카드 생성 함수
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  customTag: string;
  handleCustomTagInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleCustomTagAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCustomTagDelete: (i: number) => void;
  handleAutoTagDelete: (i: number) => void;
  handlePageMove: () => void;
}

export interface ModifyArticlePageProps extends NewCardPageProps {
  isNotAuth: boolean;
}

// 카드 상세 페이지 props
export interface CardDetailPageProps extends CardDetailProps {
  user: any;
  // 댓글 배열
  comments: Array<CommentType>;
  // 댓글창이 열려있는지
  isCommentOpen: boolean;
  // 댓글 input 태그를 다루기 위한 ref
  commentInputRef: React.RefObject<HTMLInputElement>;
  // 댓글 전송 함수
  handleCommentSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isDeleteOpen: boolean;
  handleDeleteOpen: () => void;
  handleDeleteClose: () => void;
  handleArticleDelete: () => void;
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
  // 회원정보 수정 저장
  goModifyPwd: () => void;
  goLogout: () => void;
  doWithdraw: () => void;
  handleSaveModifyData: React.MouseEventHandler;
  onChangeNickName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  name: string;
  isName: boolean;
  nameMessage: string;
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

export interface ModifyPwdProps {
  originalPassword: string;
  password: string;
  passwordConfirm: string;

  originalPasswordMessage: string;
  passwordMessage: string;
  passwordConfirmMessage: string;

  isOriginalPassword: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;

  onChangeOriginalPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickNext: () => void;
  onClickBack: () => void;
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
