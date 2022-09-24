//Lisa code
//Edits by Hunter

import { Input } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
//import { useSelector } from 'react-redux'; may not be needed

const { TextArea } = Input;

function Comments(props) {
  const user = "User"; //just using a default name for now
  const [Comment, setComment] = useState('');
  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: user,
      postId: props.postId
    };

    axios.post('/api/comment/saveComment', variables)
    .then(response => {
      if(response.data.success) {
        setComment("")
      } else {
        alert('Failed to save comment')
      }
    })
  };

  return (
    <div>
      <br />
      <p> replies</p>
      <hr />

      {/* Comment Lists*/}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: '20%', height: '52px' }}>Submit</Button>
      </form>
    </div>
  )
}

export default Comments