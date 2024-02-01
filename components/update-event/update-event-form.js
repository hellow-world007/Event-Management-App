import { useState, useEffect, useRef } from "react";
import classes from "./update-event-form.module.css";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Notification from "../ui/notification";
import { useSession } from "next-auth/react";

function UpdateEventForm({ oldId }) {
  const [enteredName, setEnteredName] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");

  const { data: session, status } = useSession();
  const username = session ? session.user.name : "";

  const randomId = uuidv4();

  const imageRef = useRef();
  const [pickedImage, setPickedImage] = useState();

  function handlePickClick() {
    imageRef.current.click();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

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

  async function submitHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");
    try {
      const allInfo = {
        name: enteredName,
        category: selectCategory,
        description: enteredDescription,
        image: pickedImage,
        location: enteredLocation,
        date: enteredDate,
        price: `$${enteredPrice}`,
        url: enteredUrl,
        id: randomId,
        user: username,
        oldId: oldId,
      };

      const response = await fetch("/api/user/update-event", {
        method: "PATCH",
        body: JSON.stringify(allInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setRequestStatus("success");

      setEnteredName("");
      setEnteredDescription("");
      setEnteredLocation("");
      setEnteredDate("");
      setEnteredPrice("");
      setEnteredUrl("");
      setPickedImage();
    } catch (error) {
      setRequestError(error.message)
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Updating event...",
      message: "Your event is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Event updated successfully!",
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
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.row}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="catagory">Select a catagory</label>
            <select
              id="catagory"
              value={selectCategory}
              onChange={(event) => setSelectCategory(event.target.value)}
            >
              <option value="All">All</option>
              <option value="NextJS">NextJS</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Development">Development</option>
              <option value="Tech">Tech</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
            </select>
          </div>
        </div>

        <div className={classes.row}>
          <div>
            <label htmlFor="descriptions">Descriptions</label>
            <textarea
              id="descriptions"
              name="descriptions"
              rows="10"
              value={enteredDescription}
              onChange={(event) => setEnteredDescription(event.target.value)}
              placeholder="Descriptions"
              required
            ></textarea>
          </div>
          <div>
            <div className={classes.picker}>
              <label htmlFor="Your image">image</label>
              <div className={classes.controls}>
                <div className={classes.preview}>
                  {!pickedImage && <p>No image picked yet.</p>}
                  {pickedImage && (
                    <Image
                      src={pickedImage}
                      alt="the image selected by user."
                      fill
                    />
                  )}
                </div>
                <input
                  className={classes.input}
                  type="file"
                  id="Your image"
                  accept="image/png, image/jpeg"
                  name="image"
                  ref={imageRef}
                  onChange={handleImageChange}
                  required
                />
                <button
                  className={classes.button}
                  type="button"
                  onClick={handlePickClick}
                >
                  Pick An Image
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.singleRow}>
          <label htmlFor="location">Location</label>
          <input
            type="location"
            id="location"
            required
            value={enteredLocation}
            onChange={(event) => setEnteredLocation(event.target.value)}
            placeholder="Location"
          />
        </div>

        <div className={classes.singleRow}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            required
            value={enteredDate}
            onChange={(event) => setEnteredDate(event.target.value)}
            placeholder="Date"
          />
        </div>

        <div className={classes.row}>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="price"
              id="price"
              required
              value={enteredPrice}
              onChange={(event) => setEnteredPrice(event.target.value)}
              placeholder="Price"
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              required
              value={enteredUrl}
              onChange={(event) => setEnteredUrl(event.target.value)}
              placeholder="Url"
            />
          </div>
        </div>

        <div className={classes.actions}>
          <button disabled={requestStatus === "pending"}>
            {requestStatus === "pending"
              ? "Updatting event..."
              : "Update Event"}
          </button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default UpdateEventForm;
