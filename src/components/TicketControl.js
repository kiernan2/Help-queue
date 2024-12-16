import React from "react";
import NewTicketForm from "./NewTicketForm";
import EditTicketForm from "./EditTicketForm";
import PropTypes from "prop-types";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import { connect } from 'react-redux';
import { type } from "@testing-library/user-event/dist/type";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainTicketList: [],
      selectedTicket: null,
      editing: false
    }; 
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props
    const action = {
      type: 'DELETE_TICKET',
      issue: id
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editingMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
      mainTicketList: editingMainTicketList,
      editing: false,
      selectedTicket: null
    });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id]
    this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({
      mainTicketList: newMainTicketList,
      formVisibleOnPage: false
    });
  }


  render() {
    let currentlyVisibleState = <TicketDetail 
      ticket = {this.state.selectedTicket} 
      onClickingDelete = {this.handleDeletingTicket} 
      onClickingEdit = {this.handleEditClick} 
    />;

    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />;
      buttonText = "Return to Ticket List";
    } 
    else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick} />;
      buttonText = "Return to Ticket List";
    } 
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation = {this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    }
    else {
      currentlyVisibleState = <TicketList ticketList = {this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>;
      buttonText = "Add Ticket";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    mainTicketList: state
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;