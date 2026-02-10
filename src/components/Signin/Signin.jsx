import { useState } from "react";

const Signin = ({ onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitSignIn = () => {
    fetch("http://localhost:3001/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("signin failed");
        }
        return res.json();
      })
      .then((user) => {
        if (user && user.id) {
          onRouteChange("home");
        }
      })
      .catch((err) => {
        console.log("Signin error:", err);
        alert("Wrong credentials");
      });
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>

            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                id="email-address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>

          <div>
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>

          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;
