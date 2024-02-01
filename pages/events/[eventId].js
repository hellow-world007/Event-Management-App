import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import DetailsPage from "@/components/event-detail/DetailsPage";
import { useRouter } from "next/router";
import TicketProfile from "@/components/tickets/ticket-profile";
import OrdersGrid from "@/components/orders/orders-list";

function ItemDetails() {
  const router = useRouter();

  const id = router.query.eventId;

  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    fetch("/api/event/create")
      .then((res) => res.json())
      .then((data) => {
        setEventsList(data.events);
      });
  }, []);

  const event = eventsList && eventsList.find((event) => event.id === id);

  return (
    <Fragment>
      <Head>
        <title>{event && event.title}</title>
        <meta name="description" content={event && event.description} />
      </Head>
      <DetailsPage event={event} />
      <div className="hide">
        <TicketProfile id={id} />
        <OrdersGrid id={id} />
      </div>
    </Fragment>
  );
}

export default ItemDetails;
