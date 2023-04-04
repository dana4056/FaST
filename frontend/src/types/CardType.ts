import { TagType } from './TagType';

export interface CardType {
  id: number;
  nickname: string;
  content: string;
  imageUrls: Array<string>;
  tags: Array<TagType>;
  isLike: boolean;
  numLikes: number;
  numComments: number;
  regTime: string;
  userId: number;
  profile: string;
  followingCheck: boolean;
}
