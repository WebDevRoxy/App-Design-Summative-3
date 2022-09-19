//code by Jacynta

import mongoose from 'mongoose';

const User = mongoose.model('User', userSchema);

export const getQuestions = async () => {
    return [
      {
        id: "1", //comment id
        body: "First comment", //text
        username: "Jack", //username
        userId: "1", //user id
        parentId: null, //if the comment is a reply or not
      },
      {
        id: "2",
        body: "Second comment",
        username: "John",
        userId: "2",
        parentId: null,
      },
      {
        id: "3",
        body: "First comment first child",
        username: "John",
        userId: "2",
        parentId: "1",
      },
      {
        id: "4",
        body: "Second comment second child",
        username: "John",
        userId: "2",
        parentId: "2",
      },
    ];
  };
  
  export const createQuestion = async (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "John",
    };
  };
  
  export const deleteQuestion = async () => {
    return {};
  };

