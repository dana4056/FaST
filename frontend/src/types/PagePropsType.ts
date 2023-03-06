import { TagType } from './TagType';
import {
  CardDetailProps,
  CardListProps,
  InputPhotoProps,
  SearchBoxProps,
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

export interface MyRecordPageProps extends SearchBoxProps, CardListProps {}
