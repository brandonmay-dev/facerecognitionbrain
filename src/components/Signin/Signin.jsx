import { useState } from "react";

const Signin = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitSignIn = () => {
    fetch(`${import.meta.env.VITE_API_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("signin status:", res.status);
        console.log("signin response:", text);

        if (!res.ok) throw new Error(text);

        return JSON.parse(text);
      })
      .then((user) => {
        if (user && user.id) {
          loadUser(user);
          onRouteChange("home");
        } else {
          throw new Error("No user.id returned");
        }
      })
      .catch((err) => {
        console.log("Signin error:", err.message || err);
        alert(err.message || "Wrong credentials");
      });
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form
          className="measure"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitSignIn();
          }}
        >
          <fieldset className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>

            <div className="mt3">
              <label className="db fw6 lh-copy f6">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f6">Password</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>

          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
          />

          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Signin;
