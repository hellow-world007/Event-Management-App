import classes from './footer.module.css'
const imagePath = "/images/logo.svg";
import Image from 'next/image';

export default function Footer(){
   return (
      <div className={classes.footer}>
        <div className={classes.logo}>
          <Image src={imagePath} alt="My IMAGE" width={120} height={120} priority />
        </div>
        <p className={classes.footerText}>
            @2023 Evently. All Rights Reserved.
        </p>
      </div>
   )
}