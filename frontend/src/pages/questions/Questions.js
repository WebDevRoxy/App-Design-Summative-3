//code by Jacynta

import { useState, useEffect } from 'react';
import QuestionScreen from './QuestionScreen';
import Question from './Question';
import {
  getQuestions as getQuestionsApi,
  createQuestion as createQuestionApi,
  deleteQuestion as deleteQuestionApi,
} from '../api'; //NOT FROM API

const Questions = ({ currentUserId }) => {
    const [backendQuestions, setBackendQuestions] = useState(); //sets backend questions
    const [activeQuestion, setActiveQuestion] = useState(null) //sets active question
    //filters questions by id
    const rootQuestions = backendQuestions.filter(
      (backendQuestions) => backendQuestions.parentId === null
    );

    //gives reply an id related to parent id
    const getReplies = questionId => {
      return backendQuestions.filter(backendQuestion => backendQuestion.parentId === questionId)
    };

    //add new comment
    const addQuestion = (text, parentId) => {
      console.log('addQuestion', text, parentId);
      createQuestionApi(text, parentId).then(question => {
        setBackendQuestions([question, ...backendQuestions]);
        setActiveQuestion(null);
      })
    };

    //delete comment
    const deleteQuestion = (questionId) => {
      if (window.confirm('Are you sure you want to delete your comment?')) {
        deleteQuestionApi(questionId).then(() => {
          const updatedBackendQuestions = backendQuestions.filter(
            (backendQuestion) => backendQuestion.id !== questionId
          );
          setBackendQuestions(updatedBackendQuestions);
        });
      }
    };

    useEffect(() => {
      getQuestionsApi().then((data) => {
        setBackendQuestions(data);
      });
    }, []);

    //questions display
    return (
      <div className='questions'>
        <h3 className='questionsTitle'>Questions and Answers</h3>
        <div className='questionScreenTitle'>Ask a question about the product</div>
        <QuestionScreen submitLabel='Write' handleSubmit='addQuestion'/>
        <div className='questionsContainer'>
          {rootQuestions.map((rootQuestion) => (
            <Question 
              key={rootQuestion.id} 
              question={rootQuestion} 
              replies={getReplies(rootQuestion.id)}
              currentUserId={currentUserId}
              deleteQuestion={deleteQuestion}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
              addQuestion ={addQuestion}
            />
          ))};
        </div>
      </div>
    )
};

export default Questions;