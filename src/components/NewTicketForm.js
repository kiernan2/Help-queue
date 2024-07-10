import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";

function NewTicketForm(props){
  
  function handleNewTicketFormSubmission(event){
    event.preventDefault();
    props.onNewTicketCreation({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: v4()
    });
  }
  
  return (
    <React.Fragment>
      <form onSelect={handleNewTicketFormSubmission}>
        <input
          type="text"
          name="names"
          placeholder="Pair Names" />
        <input 
          type="text"
          placeholder="Describe your issue." />
      </form>
    </React.Fragment>
  );
}

NewTicketForm.PropTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;