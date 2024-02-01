import EventItem from "./event-item";
import classes from "./events-grid.module.css";
import FormElement from "../form/form-el";
import LoadingPage from "../loading/loading";
import EmptyItem from "../loading/no-items";
import { useRouter } from "next/router";
import { useState } from "react";
import Pagination from "../pagination/pagination";

export default function EventsGrid({ events, isFetching }) {
  const router = useRouter();

  function handleSearch(inputVal, selectVal) {
    router.push(`/${inputVal}/${selectVal}`);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = events.slice(indexOfFirstPost, indexOfLastPost);

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
    <div className={classes.eventsPage}>
      <h3>
        Trusted by
        <br />
        Thousand of Events
      </h3>
      <FormElement onSearch={handleSearch} />
      {!isFetching ? (
        <ul className={classes.tickets}>
          {currentPosts.map((event) => {
            return <EventItem key={event.id} {...event} />;
          })}
        </ul>
      ) : (
        <LoadingPage />
      )}
      {events.length > 4 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={events.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
      {events && events.length === 0 && !isFetching && (
        <EmptyItem
          boldAlert="No events added yet."
          smallAlert="No warries - plenty of exciting events to explore!"
        />
      )}
    </div>
  );
}
