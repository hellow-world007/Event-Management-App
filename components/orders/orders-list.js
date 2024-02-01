import classes from "./order-list.module.css";
import LoadingPage from "../loading/loading";
import { useState, useEffect } from "react";
import OrderedItem from "./ordered-item";

export default function OrdersGrid({ id,ID }) {

  const [eventsList, setEventsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEventsList(data.tickets);
        setIsFetching(false);
      });
  }, []);

  const filteredEvent = eventsList.filter(item => item.id === ID)

  return (
    <div className={classes.eventsPage}>
      <h3>Orders</h3>
      {/* <FormElement onSearch={handleSearch} /> */}
      <ul className={classes.tableHeader}>
        <li>Order ID</li>
        <li>Event Title</li>
        <li>Buyer</li>
        <li>Created</li>
        <li>Amount</li>
      </ul>
      {!isFetching ? (
        <ul className={classes.orders}>
          {filteredEvent.map((event) => {
            return <OrderedItem key={event.id} {...event} />;
          })}
        </ul>
      ) : (
        <LoadingPage />
      )}
      {/* {eventsList.length === 0 && !isFetching && (
        <EmptyItem
          boldAlert="No events added yet."
          smallAlert="No warries - plenty of exciting events to explore!"
        />
      )} */}
    </div>
  );
}
