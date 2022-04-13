import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();

  const navigate = useNavigate();
  const getDoctor = () => {
    fetch("https://clinic-appointment.herokuapp.com/doctors")
      .then((r) => r.json())
      .then((r) => {
        setDoctorList(r);
      })
      .catch((e) => console.log(e));
  };

  const getSingleDoctor = (id) => {
    navigate(`/appointment/${selectedDoctor}`);
  };

  useEffect(() => {
    getDoctor();
  }, []);
  return (
    <>
      <h3>Welcome to the Appointment Booking App</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          margin: "auto",
          gap: "2rem",
        }}
      >
        <h4>Please select doctor's name/speciality</h4>
        <FormControl fullWidth>
          <InputLabel>Select Name/Speciality</InputLabel>
          <Select
            onChange={(e) => setSelectedDoctor(e.target.value)}
            label={"Select Name/Speciality"}
          >
            {doctorList.map((item) => (
              <MenuItem
                sx={{ textAlign: "center" }}
                value={item._id}
                key={item._id}
              >
                {item.name}-{item.speciality}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ border: "1px solid #5B7DB1" }} onClick={getSingleDoctor}>
          View Available Time Slots
        </Button>
      </div>
      <div style={{ marginTop: "400px" }}>
        <Button
          onClick={() => navigate("/allbookings")}
          sx={{ border: "1px solid #5B7DB1" }}
        >
          View All Previous Bookings
        </Button>
      </div>
    </>
  );
};
