import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "./SignIn.css";

const SignIn = () => {
  const signInGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const cred = GoogleAuthProvider.credentialFromResult(res);
        const usr = res.user;
        const idToken = await usr.getIdToken();
        console.log(idToken);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <button onClick={signInGoogle} className="btn btn-secondary">Sign In</button>
    </div>
  );
};

export default SignIn;
