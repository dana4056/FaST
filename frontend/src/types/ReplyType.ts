// 답글 Type
export interface ReplyType {
  // 답글 id
  id: number;
  // 답글작성자 id
  userId: number;
  // 닉네임
  nickname: string;
  // 프로필 이미지 경로
  profile: string;
  // 댓글 내용
  content: string;
  // 댓글 작성 시간
  regTime: string;
  // 현재 사용자가 좋아요 버튼을 눌렀는지
  isLike: boolean;
  // 좋아요 개수
  numLikes: number;
}
