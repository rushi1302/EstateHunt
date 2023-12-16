import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Profile() {
  const user = useSelector((state) => state.user.currentUser);

  if (user) {
    return <>Hello This is profile page of Rushikesh Dhavale</>;
  } else {
    return <Navigate to="/signin" />;
  }
}

export default Profile;
