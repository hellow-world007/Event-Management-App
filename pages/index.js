import Head from "next/head";
import StartingPageContent from "@/components/starting-page/starting-page";
import EventsGrid from "@/components/events/events-grid";
import { useState, useEffect } from "react";

export default function HomePage() {
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

  return (
    <div>
      <Head>
        <title>Event Management</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StartingPageContent />
      <EventsGrid events={eventsList} isFetching={isFetching} />
    </div>
  );
}
