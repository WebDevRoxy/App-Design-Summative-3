import { useState } from "react";

const QuestionScreen = ({
  handleSubmit,
  submitLabel,
  initialText = "",
}) => {
  //prevents comment submission if no text is present
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  //question box
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="questionTextArea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="questionSubmitButton" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
    </form>
  );
};

export default QuestionScreen;