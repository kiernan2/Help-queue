import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

function TicketList(props) {
  return (
    <React.Fragment>
      <hr />
      {Object.values(props.ticketList).map((ticket) =>
        <Ticket
          whenTicketClicked = {props.onTicketSelection}
          names={ticket.names}
          Location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          id={ticket.id}
          key={ticket.id} />
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;