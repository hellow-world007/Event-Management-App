import classes from "./icons-container.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState,useEffect } from "react";
import Notification from "../ui/notification";

export default function IconsContainer({ id }) {
  const [showPopup, setShowPopup] = useState(false);

  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  function deletePopupHandler(event) {
    event.preventDefault();
    setShowPopup(!showPopup);
  }

  async function deleteEventHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");
    try {
      const response = await fetch("/api/user/delete-event", {
        method: "DELETE",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setShowPopup(!showPopup);
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setRequestStatus("success");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Deletting events...",
      message: "Your event is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Event deletted successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <>
      <div className={classes.iconContainer}>
        <Link href={`/update-event/${id}`}>
          <Image
            className={classes.icon}
            src={`/icons/edit.svg`}
            width={25}
            height={25}
            alt="edit-icon"
          />
        </Link>
        <p onClick={deletePopupHandler}>
          <Image
            className={classes.icon2}
            src={`/icons/delete.svg`}
            width={25}
            height={25}
            alt="delete-icon"
          />
        </p>
      </div>

      {showPopup && (
        <div className={classes.overlay}>
          <div className={classes.deletePopup}>
            <p>Delete Event?</p>
            <div className={classes.btns}>
              <button
                className={classes.cancelBtn}
                onClick={() => setShowPopup(!showPopup)}
              >
                cancel
              </button>
              <button
                className={classes.deleteBtn}
                onClick={deleteEventHandler}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </>
  );
}
