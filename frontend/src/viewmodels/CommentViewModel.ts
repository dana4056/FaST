import React from 'react';

import {
  doCreateComment,
  doGetComments,
  doDeleteComment,
  doUpdateComment,
  doGetCommentReplies,
  doCreateCommentReply,
  commentReplyLike,
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

  const deleteComment = async (commentId: number, userId: number) => {
    const res = await doDeleteComment(commentId, userId);
    return res;
  };

  const updateComment = async (
    commentId: number,
    content: string,
    userId: number
  ) => {
    const res = await doUpdateComment(commentId, content, userId);
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
  const likeCommentReply = async (commentReplyId: number, userId: number) => {
    const res = await commentReplyLike(commentReplyId, userId);
    return res;
  };
  return {
    createComment,
    getComments,
    deleteComment,
    updateComment,
    getCommentReplies,
    createCommentReply,
    likeCommentReply,
  };
}

export default CommentViewModel;
