// import React, { useState } from 'react';
import React, { Component } from "react";

import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';

const datesToAddContentTo = ['06/06/2023', '06/10/2023', '06/30/2023'];


function isSameDay(a, b) {
  return true;

}



function tileContent({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
      return 'My content';
    }
  }
}

class CalendarViewer extends Component {
  render() {
  return (
    <Calendar
      // onClickDay={test}
      // value={value}
      // onClickWeekNumber={test2}
      onClickYear={(value, event) => {
        console.log("!!!!!!!!!",value);
        alert('Clicked year: ~~~~', value, event);
      }}
      tileContent={tileContent}
    />
  );
  }
}



export default CalendarViewer;