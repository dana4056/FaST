import React from 'react';

import {
  doCreateComment,
  doGetComments,
  doGetCommentReplies,
  doCreateCommentReply,
} from '../api/comment';

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
  const getCommentReplies = async (
    commentId: number,
    userId: number,
    size: number,
    offset: number
  ) => {
    const res = await doGetCommentReplies(commentId, userId, size, offset);
    return res;
  };
  const createCommentReply = async (
    commentId: number,
    content: string,
    userId: number
  ) => {
    const res = await doCreateCommentReply(commentId, content, userId);
    return res;
  };
  return {
    createComment,
    getComments,
    getCommentReplies,
    createCommentReply,
  };
}

export default CommentViewModel;