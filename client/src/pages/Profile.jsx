import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailed,
} from "../../redux/userSlice";
let status;
function Profile() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const user = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  console.log(user);
  console.log(file);
  console.log(loading);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask
      .then(() => {
        alert("Image Uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photo: downloadURL })
        );
      }
    );
  };

  // to handle the states
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  console.log(file);

  // handle submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${user._id}`, {
        method: "POST", // Corrected from 'type' to 'method'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const userData = await response.json();
      if (!response.ok) {
        dispatch(updateUserFailed(userData.message || "Update failed")); // Assuming error message is available in userData
        return;
      }
      dispatch(updateUserSuccess(userData));
      status = true;
      console.log(userData);
    } catch (error) {
      dispatch(updateUserFailed(error.message || "Update failed")); // Catch any network-related errors
    }
  };

  // to delete the user - rushikesh dhavale

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(deleteUserFailed(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailed(error));
    }
  };

  // to logout

  const handleLogout = async () => {
    try {
      dispatch(logoutUserStart());
      const response = await fetch("/api/auth/logout");
      const data = await response.json();

      if (data.success === false) {
        dispatch(logoutUserFailed(data.message));
        return;
      }
      dispatch(logoutUserSuccess());
    } catch (error) {
      dispatch(logoutUserFailed(data.message));
    }
  };

  if (user) {
    return (
      <>
        {
          <div className="max-w-[350px] sm:max-w-lg mx-auto  ">
            <h2 className="text-center font-medium text-2xl uppercase m-5">
              Profile
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <div className="flex items-center justify-center flex-col">
                <input
                  type="file"
                  id="photo"
                  ref={fileRef}
                  accept="image/*"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <img
                  src={formData.avatar || user.photo}
                  id="img"
                  alt="img"
                  className="h-24 w-24 rounded-full object-cover outline-none"
                  onClick={() => {
                    fileRef.current.click();
                  }}
                  defaultValue={user.photo}
                />
              </div>
              <input
                type="text"
                id="username"
                placeholder="username"
                className="border p-3 rounded-lg flex-grow-1 "
                defaultValue={user.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="border p-3 rounded-lg"
                defaultValue={user.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                id="password"
                placeholder="password"
                className="border p-3 rounded-lg"
                onChange={handleChange}
                required
              />
              <button className=" bg-[#192655] text-[#fff] p-3 rounded-lg text-lg uppercase hover:opacity-80">
                {loading ? "loading...." : "update"}
              </button>
            </form>
            {status && (
              <p className="text-xl text-[#00ff00] text-center m-2 capitalize">
                User updated successfully
              </p>
            )}
            {error && <p className="text-red text-center">{error}</p>}
            <div className="flex justify-between mt-3 text-red text-xl cursor-pointer">
              <span onClick={handleDelete}>Delete Account</span>
              <span onClick={handleLogout}>Sign Out</span>
            </div>
          </div>
        }
      </>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

export default Profile;
