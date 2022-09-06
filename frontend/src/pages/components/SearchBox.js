//code by Jacynta
//currently following "React & Node ECommerce Tutorials for Beginners 2022 [MERN Stack ECommerce Website]" tutorial by Coding with Basir on YouTube. Will make more tweaks for originality later on

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search"); //if query exists, redirects user to search and passes query as query string otherwise redirct user to search
  };

  //search box
  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          aria-label="Search Products"
          aria-describedby="buttonSearch"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="buttonSearch">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
