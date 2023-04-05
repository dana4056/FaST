import axios from 'axios';

const api = axios.create({
  baseURL: 'https://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function doCreateComment(
  articleId: string,
  content: string,
  userId: number
) {
  try {
    const res = await api.post('/comment', {
      articleId: Number(articleId),
      content,
      userId,
    });
    return res;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}

export async function doDeleteComment(id: number, userId: number) {
  try {
    const res = await api.delete(`/comment/${id}/${userId}`, {
      params: { id, userId },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function doUpdateComment(
  commentId: number,
  content: string,
  userId: number
) {
  try {
    const res = await api.put(`/comment/modify-comment`, {
      commentId,
      content,
      userId,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function doGetComments(
  articleId: string,
  userId: number,
  size: number,
  offset: number
) {
  try {
    const res = await api.get(
      `/comment/${articleId}/${userId}/${size}/${offset}`
    );
    return res;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}

export async function doGetCommentReplies(
  commentId: number,
  userId: number,
  size: number,
  offset: number
) {
  try {
    const res = await api.get(
      `/commentReply/${commentId}/${userId}/${size}/${offset}`
    );
    return res;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}

export async function doCreateCommentReply(
  commentId: number,
  content: string,
  userId: number
) {
  try {
    const res = await api.post(`/commentReply`, {
      commentId,
      content,
      userId,
    });
    return res;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}

// 게시물 좋아요 api
export async function commentLike(commentId: number, userId: number) {
  try {
    const res = await api.get(`/likes/comment`, {
      params: { commentId, userId },
    });
    // console.log(res);
    return res;
  } catch (error) {
    // console.error(error);
    return error;
  }
}
// 게시물 좋아요 api
export async function commentReplyLike(commentReplyId: number, userId: number) {
  try {
    const res = await api.get(`/likes/comment`, {
      params: { commentReplyId, userId },
    });
    // console.log(res);
    return res;
  } catch (error) {
    // console.error(error);
    return error;
  }
}
