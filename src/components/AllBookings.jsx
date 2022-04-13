import React, { useEffect } from "react";
import { useState } from "react";

export const AllBookings = () => {
  const [data, setData] = useState([]);
  const getBookings = () => {
    fetch("https://clinic-appointment.herokuapp.com/bookings")
      .then((r) => r.json())
      .then((r) => setData(r))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <>
      {data.length > 0 ? (
        <div>
          <h1>List of all bookings done so far</h1>
          {data && (
            <div
              style={{
                display: "flex",
                flexFlow: "row wrap",
                width: "100%",
                margin: "auto",
              }}
            >
              {data.map((item) => (
                <div
                  key={item._id}
                  style={{
                    border: "1px solid gray",
                    padding: "1rem",
                    width: "30%",
                    margin: "1rem auto",
                    backgroundColor: "#E6D5B8",
                  }}
                >
                  <h3>
                    {item.doctor.name}- {item.doctor.speciality}
                  </h3>
                  <p>
                    Booked on: <b>{item.date}</b>
                  </p>
                  <p>
                    Booked for:<b>{item.time}</b>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h1>No Bookings yet</h1>
      )}
    </>
  );
};
