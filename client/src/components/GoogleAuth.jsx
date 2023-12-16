import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function GoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleHandleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signinSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      onClick={googleHandleClick}
      className="bg-red p-3 rounded-lg text-lg uppercase hover:opacity-80">
      Continue with Google
    </button>
  );
}

export default GoogleAuth;
