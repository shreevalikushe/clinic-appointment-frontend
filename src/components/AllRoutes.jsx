import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllBookings } from "./AllBookings";
import { Appointment } from "./Appointment";
import { Home } from "./Home";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/appointment/:id" element={<Appointment />} />
      <Route path="/allbookings" element={<AllBookings />} />
    </Routes>
  );
};
