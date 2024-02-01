import { useState, useEffect } from "react";
import classes from "./auth-form.module.css";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Notification from "../ui/notification";
import Image from "next/image";

function AuthForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  const [status, setStatus] = useState("idle");

  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        setWarning("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [warning]);

  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredName("");
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (isLogin) {
      setStatus("submitting");
      //retrive the data by sending req to next auth
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        setStatus("idle");
        router.replace("/edit-profile");
      } else {
        setStatus("idle");
        setWarning(result.error);
      }
    } else {
      setRequestStatus("pending");
      try {
        //post the submitted data
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            name: enteredName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
        }

        setRequestStatus("success");
        setEnteredEmail("");
        setEnteredPassword("");
        setEnteredName("");

        // console.log(data);
        setWarning(data.message);
      } catch (error) {
        setRequestError(error.message)
        setRequestStatus("error");
        setWarning(error.message);
      }
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Submitting response...",
      message: "Your response is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Response submitted successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  const imagePath = "/images/logo.svg";

  return (
    <section className={classes.auth}>
      <div className={classes.logo}>
        <Image src={imagePath} alt="Logo" width={100} height={100} />
      </div>
      <p className={classes.title}>
        {isLogin ? "Sign in" : "Create your account"}
      </p>
      <p className={classes.text}>to continue to Evently</p>

      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
              placeholder="Full Name"
            />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            required
            value={enteredEmail}
            onChange={(event) => setEnteredEmail(event.target.value)}
            placeholder="Email"
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={enteredPassword}
            onChange={(event) => setEnteredPassword(event.target.value)}
            placeholder="Password"
          />
        </div>
        <div className={classes.actions}>
          <button disabled={status === "submitting"} className={classes.toggle}>
            {isLogin
              ? status === "submitting"
                ? "Logging in..."
                : "Log in"
              : "Register"}
          </button>

          {warning && <p className={classes.warning}>{warning}</p>}
          <div className={classes.formFooter}>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <span onClick={switchAuthModeHandler}>
              {isLogin ? "Register" : "Login"}
            </span>
          </div>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default AuthForm;
