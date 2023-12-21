import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
function Profile() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  console.log(file);
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
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    const showUpdatedMessage = () => {
      <p className="text-sm self-center">
        {fileUploadError ? (
          <span className="text-red-700">
            Error Image upload (image must be less than 2 mb)
          </span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-700">updated image successfully.</span>
        ) : (
          ""
        )}
      </p>;
    };

    showUpdatedMessage();

    return () => {
      clearTimeout();
    };
  }, []);
  console.log(file);
  if (user) {
    return (
      <div className="max-w-[350px] sm:max-w-lg mx-auto  ">
        <h2 className="text-center font-medium text-2xl uppercase m-5">
          Profile
        </h2>
        <form className="flex flex-col gap-4 ">
          <div className="flex items-center justify-center flex-col">
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              src={formData.avatar || user.photo}
              alt="img"
              className="h-24 w-24 rounded-full object-cover outline-none"
              onClick={() => {
                fileRef.current.click();
              }}
            />
          </div>
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg flex-grow-1 "
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
          />
          <button
            type="submit"
            className=" bg-[#192655] text-[#fff] p-3 rounded-lg text-lg uppercase hover:opacity-80">
            Update
          </button>
        </form>
        <div className="flex justify-between mt-3 text-red text-xl">
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}

export default Profile;
