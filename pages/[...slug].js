import { Fragment } from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import ErrorAlert from "@/components/error-alert/error-alert";
import Head from "next/head";
import StartingPageContent from "@/components/starting-page/starting-page";
import { useRouter } from "next/router";
import EventsGrid from "@/components/events/events-grid";

const FilterdItems = () => {
  const router = useRouter();

  const [eventsList, setEventsList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetch("/api/event/create", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        setEventsList(data.events);
        setIsFetching(false);
      });
  }, []);

  const searchParam = router.query.slug;

  const searchIp = searchParam && searchParam[0];
  const selectIp = searchParam && searchParam[1];

  const headElement = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`Find your favourite events for ${searchIp}/${selectIp}`}
      />
    </Head>
  )

  if (
    !searchIp ||
    searchIp.trim() === "" ||
    !selectIp ||
    selectIp.trim() === ""
  ) {
    return (
      <Fragment>
        {headElement}
        <StartingPageContent />
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Link className="btn" href='/'>Show All Events</Link>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = eventsList.filter((event) => {
    const eventName = event.name;
    const eventcategory = event.category;
    return eventName === searchIp && eventcategory === selectIp;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {headElement}
        <StartingPageContent />
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Link className="btn" href='/'>Show All Events</Link>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {headElement}
      <StartingPageContent />
      <EventsGrid events={filteredEvents} isFetching={isFetching} />
    </Fragment>
  );
};

export default FilterdItems;
