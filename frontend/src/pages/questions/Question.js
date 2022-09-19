import QuestionScreen from "./QuestionScreen";

//maybe just move this to ProductScreen.js
const Question = ({ 
  question, 
  replies, 
  currentUserId, 
  deleteQuestion, 
  activeQuestion,
  addQuestion, 
  setActiveQuestion,
  parentId = null,
}) => { 
  const canReply = Boolean(currentUserId) //sets reply to yes or no
  const canDelete = currentUserId === question.userId; //if user id matches question id then they can delete the comment
  //makes reply child of parent comment 
  const isReplying = 
    activeQuestion && 
    activeQuestion.type === 'replying' && 
    activeQuestion.id === question.id;
  const replyId = parentId ? parentId : question.Id; //sets reply id
  return (
    <div className='question'>
      <div className='questionImageContainer'>
        <img src='###'/>
      </div>
      <div className='questionRightSide'>
        <div className='questionContent'>
          <div className='user'>{question.username}</div>
        </div>
        <div className='questionText'>{question.body}</div>
        <div className='questionAction'>
          {canReply && 
          <div 
            className='questionAction' 
            onClick={() => 
              setActiveQuestion({id: question.id, type: 'reply'})
            }
          >
            Reply
          </div>}
          {canDelete && (
            <div 
              className='questionAction' 
              onClick={() => deleteQuestion(question.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <QuestionScreen 
              submitLabel='Reply' 
              handleSubmit={(text) => addQuestion(text, replyId)}
            />
        )}
        {replies.length > 0 && (
          <div className='replies'>
            {replies.map(reply => (
              <Question 
                question={reply} 
                key={reply.id}
                replies={[]} 
                currentUserId={currentUserId} 
                deleteQuestion={deleteQuestion}
                addQuestion={addQuestion}
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
                parentId={question.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
};

export default Question;
