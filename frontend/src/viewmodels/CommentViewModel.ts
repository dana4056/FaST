import React from 'react';

import { doCreateComment } from '../api/comment';

function CommentViewModel() {
  const createComment = async (
    articleId: string,
    content: string,
    userId: number
  ) => {
    const res = await doCreateComment(articleId, content, userId);
    return res;
  };
  return {
    createComment,
  };
}

export default CommentViewModel;
