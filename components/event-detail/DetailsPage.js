import { useEffect, useState } from "react";
import classes from "./DetailsPage.module.css";
import Image from "next/image";
import LoadingPage from "../loading/loading";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Notification from "../ui/notification";

const DetailsPage = ({ event }) => {
  if (!event) {
    return (
      <div className={classes.center}>
        <LoadingPage />
      </div>
    );
  }

  const id = event.id;
  const randomId = uuidv4();

  const humanReadableDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const location = "location.svg";
  const calendar = "calendar.svg";

  const { data: session, status } = useSession();
  const username = session ? session.user.name : "";
  const loading = status === "loading";
  const router = useRouter();

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

  async function getTicketHandler(event) {
    if (!session) {
      router.replace("/auth");
    }

    // router.replace("/profile");
    setRequestStatus("pending");
    try {
      const reqBody = {
        image: event.image,
        price: event.price,
        category: event.category,
        date: event.date,
        name: event.name,
        description: event.description,
        location: event.location,
        url: event.url,
        user: username,
        id: event.id,
        addId: randomId,
      };

      const response = await fetch(`/api/${id}`, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setRequestStatus("success");
    } catch (error) {
      setRequestError(error.message)
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Getting tickets...",
      message: "Your ticket is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Ticket added successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Ticket already exists!",
      message: requestError,
    };
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.eventDetails}>
        <div className={classes.imageSection}>
          <Image src={event.image} alt={event.name} height={600} width={600} />
        </div>

        <div className={classes.infoSection}>
          <div className={classes.nameText}>
            <p>{event.name}</p>
          </div>

          <div className={classes.headerText}>
            <h2>{event.price}</h2>
            <p>{event.category}</p>
            <p className={classes.author}>{event.user}</p>
          </div>

          <button
            className={classes.actions}
            onClick={() => getTicketHandler(event)}
          >
            {session ? "buy ticket" : "get ticket"}
          </button>

          <div className={classes.date}>
            <Image
              src={`/icons/${calendar}`}
              alt={event.name}
              width={20}
              height={20}
            />
            <p>{humanReadableDate}</p>
          </div>

          <div className={classes.location}>
            <Image
              src={`/icons/${location}`}
              alt={event.name}
              width={20}
              height={20}
            />
            <p>{event.location}</p>
          </div>

          <div className={classes.outcome}>
            <p>What You'll Learn:</p>
            <p className={classes.description}>{event.description}</p>
          </div>
        </div>
      </div>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </div>
  );
};

export default DetailsPage;
