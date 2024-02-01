import Link from "next/link";
import Image from "next/image";
import classes from "./grid-item.module.css";
import IconsContainer from "@/components/icons-container/icons-container";

export default function OrganizedItem({
  name,
  category,
  description,
  image,
  location,
  date,
  price,
  url,
  user,
  id,
}) {

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location?.replace(", ", "\n");

  return (
    <article className={classes.event}>
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
          <Image src={`icons/calendar.svg`} alt={name} width={20} height={20} />
          <p>{humanReadableDate}</p>
        </div>
        <div className={classes.name}>
          <p>{name}</p>
        </div>
        <div className={classes.itemFooter}>
          <p className={classes.author}>{user}</p>
          <Link href={`/order-details/${id}`}>
            <p>Order Details</p>
            <Image src={"icons/arrow.svg"} alt={name} width={10} height={10} />
          </Link>
        </div>
      </div>
      <IconsContainer id={id} />
    </article>
  );
}
