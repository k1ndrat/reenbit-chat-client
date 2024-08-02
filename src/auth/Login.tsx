import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../context/authContext";
import Button from "../components/Button";
import { useToast } from "../components/Toast/ToastContext";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const { open } = useToast();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const [type, setType] = useState<"LOGIN" | "REGISTER">("LOGIN");

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (type === "LOGIN") {
      if (!isSignIn) {
        setIsSignIn(true);
        await doSignInWithEmailAndPassword(email, password).catch((err) => {
          setIsSignIn(false);

          open(err.code, "ERROR");
        });
      }
    } else {
      await doCreateUserWithEmailAndPassword({ email, password })
        .then(() => {
          setType("LOGIN");
        })
        .catch((err) => {
          open(err.code, "ERROR");
        });
    }
  };

  const handleGoogleSignIn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!isSignIn) {
      setIsSignIn(true);
      await doSignInWithGoogle().catch((err) => {
        setIsSignIn(false);
        open(err.code, "ERROR");
      });
    }
  };

  return (
    <div className="h-screen grid place-content-center">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <form className="grid gap-2 p-4 rounded-md bg-[#F5F5F5] border border-[#c0bdbd] w-96 shadow-xl">
        <h2 className="text-center uppercase font-semibold text-lg">{type}</h2>
        <input
          className="px-3 py-2 text-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="px-3 py-2 text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <Button title={type} onClick={handleSubmit} />
        <Button title={"GOOGLE"} onClick={handleGoogleSignIn} />

        <button
          type="button"
          onClick={() => {
            setType((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
          }}
        >
          {type === "LOGIN"
            ? "Doesn`t have an account yet?"
            : "Already have an account?"}
        </button>
      </form>
    </div>
  );
};

export default Login;
