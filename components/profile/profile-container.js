import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import classes from "./profile-container.module.css";
import { useRef, useState } from "react";

function ProfileContainer(props) {
  const [showForm, setShowForm] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const username = session ? session.user.name : "";
  const email = session ? session.user.email : "";

  const coverImgPath = "/icons/cover.jpg";
  const profileImgPath = "/icons/profile.jpg";

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const oldNameRef = useRef();
  const newNameRef = useRef();

  const oldEmailRef = useRef();
  const newEmailRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    const enteredOldName = oldNameRef.current.value;
    const enteredNewName = newNameRef.current.value;

    const enteredOldEmail = oldEmailRef.current.value;
    const enteredNewEmail = newEmailRef.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
      oldName: enteredOldName,
      newName: enteredNewName,
      oldEmail: enteredOldEmail,
      newEmail: enteredNewEmail,
    });
  }

  function handleEditInfo() {
    setShowForm((prev) => !prev);
  }

  return (
    <div className={classes.profileContainer}>
      <div className={classes.innerContainer}>
        <Image
          className={classes.coverImg}
          src={coverImgPath}
          alt="cover image"
          width={1000}
          height={150}
        />
        <Image
          className={classes.profileImg}
          src={profileImgPath}
          alt="profile image"
          width={70}
          height={70}
        />
        <div className={classes.infoContainer}>
          <p>Username:</p>
          <p className={classes.name}>{username}</p>
          <p>Email:</p>
          <p className={classes.email}>{email}</p>
        </div>
        <button className={classes.editProfileBtn} onClick={handleEditInfo}>Edit Profile</button>
      </div>
      {showForm && (
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" ref={newPasswordRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="old-password">Old Password</label>
            <input type="password" id="old-password" ref={oldPasswordRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="new-name">New Name</label>
            <input type="name" id="new-name" ref={newNameRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="old-name">Old Name</label>
            <input type="name" id="old-name" ref={oldNameRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="new-email">New Email</label>
            <input type="email" id="new-email" ref={newEmailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="old-email">Old Email</label>
            <input type="email" id="old-email" ref={oldEmailRef} />
          </div>
          <div className={classes.action}>
            <button>Change Info</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProfileContainer;
