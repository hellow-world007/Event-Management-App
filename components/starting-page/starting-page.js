import classes from "./starting-page.module.css";
import Image from "next/image";

function StartingPageContent() {

  const imagePath = "/images/hero.png";

  return (
    <section className={classes.starting}>
      <div className={classes.startingLeft}>
        <h1>
          Host, Connect,
          <br />
          Celebrate: Your
          <br />
          Events, Our Platform!
        </h1>
        <p>
          Book and earn helpful tips from 3,168+ mentors in
          <br /> world-class companies with our global community
        </p>
        <p className={classes.btn}>Explore now</p>
      </div>

      <div className={classes.imageSection}>
        <Image src={imagePath} alt="Hero image" width={350} height={400} />
      </div>
    </section>
  );
}

export default StartingPageContent;
