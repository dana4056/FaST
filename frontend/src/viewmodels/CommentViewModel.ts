import React from 'react';

import { doCreateComment, doGetComments } from '../api/comment';

function CommentViewModel() {
  const createComment = async (
    articleId: string,
    content: string,
    userId: number
  ) => {
    const res = await doCreateComment(articleId, content, userId);
    return res;
  };

  const getComments = async (
    articleId: string,
    userId: number,
    size: number,
    offset: number
  ) => {
    const res = await doGetComments(articleId, userId, size, offset);
    return res;
  };
  return {
    createComment,
    getComments,
  };
}

export default CommentViewModel;
