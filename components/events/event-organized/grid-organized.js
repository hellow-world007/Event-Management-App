import { useEffect, useState } from "react";
import classes from "./grid-organized.module.css";
import Link from "next/link";
import OrganizedItem from "./grid-item";
import LoadingPage from "@/components/loading/loading";
import EmptyItem from "@/components/loading/no-items";
import Pagination from "@/components/pagination/pagination";

export default function OrganizedGrid() {
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

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = eventsList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(events.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={classes.profilePage}>
      <div className={classes.profileMyTickets}>
        <div className={classes.profileHeader}>
          <p className={classes.title}>Events Organized</p>
          <Link href="/create-event" className={classes.profileBtn}>
            create more event
          </Link>
        </div>
        <div>
          {!isFetching ? (
            <ul className={classes.tickets}>
              {currentPosts.map((event) => {
                return <OrganizedItem key={event.id} {...event} />;
              })}
            </ul>
          ) : (
            <LoadingPage />
          )}
          {eventsList.length > 4 && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={eventsList.length}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          )}
          {eventsList.length === 0 && !isFetching && (
            <EmptyItem
              boldAlert="No events organized yet."
              smallAlert="No warries - plenty of exciting events to explore!"
            />
          )}
        </div>
      </div>
    </div>
  );
}
