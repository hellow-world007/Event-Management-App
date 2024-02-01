import Link from "next/link";
import Image from "next/image";
import classes from "./event-item.module.css";
import IconsContainer from "../icons-container/icons-container";

export default function EventItem({
  image,
  price,
  category,
  description,
  date,
  name,
  location,
  url,
  user,
  id,
}) {

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const exploreLink = `/events/${id}`;

  return (
    <article className={classes.event}>
      <Link href={exploreLink}>
        <header>
          <div className={classes.image}>
            <Image src={image} alt={name} fill />
          </div>
          <div className={classes.headerText}>
            <h2>{price}</h2>
            <p>{category}</p>
          </div>
        </header>
        <div className={classes.content}>
          <div className={classes.date}>
            <p>{humanReadableDate}</p>
          </div>
          <div className={classes.name}>
            <p>{name}</p>
          </div>
          <p className={classes.author}>{user}</p>
        </div>
      </Link>
      <IconsContainer id={id} />
    </article>
  );
}
