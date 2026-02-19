import { useState } from "react";

const Register = ({ onRouteChange, loadUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitRegister = () => {
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          console.log("Register failed:", data);
          throw new Error(typeof data === "string" ? data : "register failed");
        }

        return data;
      })
      .then((user) => {
        if (user && user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      })
      .catch((err) => {
        console.log("Register error:", err.message);
        alert(err.message);
      });
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="register" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>

            <div className="mt3">
              <label className="db fw6 lh-copy f6">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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

          <div>
            <input
              onClick={onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>

          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("signin")}
              className="f6 link dim black db pointer"
            >
              Sign In
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
