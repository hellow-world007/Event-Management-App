import classes from './ordered-item.module.css'

export default function OrderedItem({
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
  addId,
}) {

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <li className={classes.event}>
        <p className={classes.id}>{addId}</p>
        <p>{name}</p>
        <p>{user}</p>
        <p>{humanReadableDate}</p>
        <p>{price}</p>
    </li>
  );
}