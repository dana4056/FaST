import { ReplyType } from './ReplyType';
// 댓글 타입
export interface CommentType extends ReplyType {
  // 답글 개수
  numReplies: number;
}
