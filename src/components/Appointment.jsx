import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Alert, Button } from "@mui/material";

export const Appointment = () => {
  const [docData, setDocData] = useState([]);
  const [date, setDate] = useState(moment().format("MMM Do YY"));
  const { id } = useParams();
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();
  const getSingleDoctor = () => {
    fetch(`https://clinic-appointment.herokuapp.com/doctors/${id}`)
      .then((r) => r.json())
      .then((r) => {
        setDocData(r.availability);
      })
      .catch((e) => console.log(e));
  };
  const bookSlot = (e) => {
    const payload = {
      doctor: id,
      time: e.target.value,
      date: date,
    };
    fetch("https://clinic-appointment.herokuapp.com/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };
  useEffect(() => {
    getSingleDoctor();
  }, [id]);
  return (
    <>
      <div
        style={{
          width: "500px",
          margin: "auto",
          border: "1px solid black",
          marginTop: "20px",
        }}
      >
        <h3>Please select date and time as per your convenience </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          <p
            onClick={(e) => {
              setDate(e.currentTarget.innerText);
            }}
            style={{
              border: "1px solid red",
              padding: "5px",
            }}
          >
            {moment().format("MMM Do YY")}
          </p>
          <p
            onClick={(e) => {
              setDate(e.currentTarget.innerText);
            }}
            style={{
              border: "1px solid red",
              padding: "5px",
            }}
          >
            {moment().add(1, "days").format("MMM Do YY")}
          </p>
          <p
            onClick={(e) => {
              setDate(e.target.innerHTML);
            }}
            style={{
              border: "1px solid red",
              padding: "5px",
            }}
          >
            {moment().add(2, "days").format("MMM Do YY")}
          </p>
          <p
            onClick={(e) => {
              setDate(e.target.innerHTML);
            }}
            style={{
              border: "1px solid red",
              padding: "5px",
            }}
          >
            {moment().add(3, "days").format("MMM Do YY")}
          </p>
        </div>
        <div>
          <b>Please note that each appointment is of 20 mins slot</b>
          {docData.map((item, i) => (
            <div
              style={{
                display: "flex",
                height: "40px",
                justifyContent: "space-evenly",
                gap: "1rem",
              }}
              onClick={(e) =>
                (e.currentTarget.style.textDecoration = "line-through")
              }
              key={i}
            >
              <p>{item}</p>
              <Button
                value={item}
                onClick={(e) => {
                  e.currentTarget.innerText = "Slot Booked";
                  bookSlot(e);
                }}
              >
                Book Slot
              </Button>
            </div>
          ))}
        </div>
        <div style={{ width: "80%", margin: "auto" }}>
          {toast && (
            <Alert severity="success" color="info">
              Appointment Booked Succesfully! Thanks!
            </Alert>
          )}
        </div>
      </div>
      <div style={{ marginTop: "200px" }}>
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
