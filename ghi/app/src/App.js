import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import React from 'react';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <React.Fragment>
      <BrowserRouter>
        <Nav />
        <div className="container">
          {/* <PresentationForm /> */}
          {/* <LocationForm /> */}
          {/* <ConferenceForm /> */}
          {/* <AttendConferenceForm /> */}
          {/* <AttendeesList attendees={props.attendees} /> */}
          <Routes>
            <Route path ="index" element={<MainPage />}/>
            <Route path ="/locations/new" element={<LocationForm />}/>
            <Route path ="/conferences/new" element={<ConferenceForm />}/>
            <Route path ="/attendees/new" element={<AttendConferenceForm />}/>
            <Route path ="/attendees" element={<AttendeesList attendees={props.attendees} />}/>
            <Route path ="/presentations/new" element={<PresentationForm />}/>
          </Routes>
        </div>
      </BrowserRouter> 
    </React.Fragment>
  );
}  
export default App;

