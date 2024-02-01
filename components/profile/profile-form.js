import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm(props) {
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
    const enteredNedName = newNameRef.current.value;

    const enteredOldEmail = oldEmailRef.current.value;
    const enteredNewEmail = newEmailRef.current.value;

    props.oldPassword = enteredOldPassword;
    props.newPassword = enteredNewPassword;
    props.oldName = enteredOldName;
    props.newName = enteredNedName;
    props.oldEmail = enteredOldEmail;
    props.newEmail = enteredNewEmail;
    // optional: Add validation
    // props.onChangePassword({
    //   oldPassword: enteredOldPassword,
    //   newPassword: enteredNewPassword,
    // });
  }

  return (
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
  );
}

export default ProfileForm;
