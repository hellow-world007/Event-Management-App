import Image from "next/image";
import classes from "./ticket-item.module.css";

export default function TicketItem({
  image,
  price,
  category,
  date,
  name,
  description,
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

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={name} fill />
        </div>
        <div className={classes.headerText}>{humanReadableDate}</div>
      </header>

      <div className={classes.content}>
        <div className={classes.name}>
          <p>{name}</p>
        </div>
      </div>
      <p className={classes.author}>{user}</p>
    </article>
  );
}
