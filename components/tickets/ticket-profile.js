import { useEffect, useState } from "react";
import classes from "./ticket-profile.module.css";
import Link from "next/link";
import TicketItem from "./ticket-item";
import LoadingPage from "../loading/loading";
import EmptyItem from "../loading/no-items";
import Pagination from "../pagination/pagination";

export default function TicketProfile({ id }) {
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
    if (currentPage !== Math.ceil(eventsList.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={classes.profilePage}>
      <div className={classes.profileMyTickets}>
        <div className={classes.profileHeader}>
          <p className={classes.title}>my tickets</p>
          <Link href="/" className={classes.profileBtn}>
            explore more event
          </Link>
        </div>
        <div>
          {!isFetching ? (
            <ul className={classes.tickets}>
              {currentPosts.map((event) => {
                return <TicketItem key={event.addId} {...event} />;
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
          {eventsList && eventsList.length === 0 && !isFetching && (
            <EmptyItem
              boldAlert="No event tickets purchased yet."
              smallAlert="No warries - plenty of exciting events to explore!"
            />
          )}
        </div>
      </div>
    </div>
  );
}
