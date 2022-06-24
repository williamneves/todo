import React, { useState, useContext, useRef } from "react";
import "./UserSettings.css";
import InputRounded from "./../../components/common/InputRounded/InputRounded";
import {
  db,
  doc,
  updateDoc,
  logout,
  ref,
  getDownloadURL,
  uploadString,
  storage,
  serverTimestamp,
} from "../../lib/firebase";
import { appContext } from "../../lib/context";
import toast from "react-hot-toast";
import Moment from "react-moment";
import "moment-timezone";
import {
  LogoutIcon,
  CloudUploadIcon,
  PencilAltIcon,
  KeyIcon,
  CameraIcon,
} from "@heroicons/react/outline";

// UserSettings component
const UserSettings = () => {
  // Context
  const { userDB, setUserDB, authUser } = useContext( appContext );
  
  //Create states
  const [onEdit, setOnEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tempUserDB, setTempUserDB] = useState(userDB);
  const [ profileWasUpdated, setProfileWasUpdated ] = useState( false );
  

  // Use ref to store the photoImage file reference
  const newProfileImage = useRef();
  const formRef = useRef();

  // Handle change of input
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setUserDB({ ...userDB, [name]: value });

    // Compare the tempUserDB with the userDB
    if (tempUserDB[name] !== value) {
      setProfileWasUpdated(true);
    }
  };

  // Handle the Image Upload
  const handleImageChange = async (e) => {
    // console.log("handleImageChange");

    const toastId = toast.loading("Checking file...");

    // Check if this file is an image
    if (!e.target.files[0].type.includes("image")) {
      toast.error("Please select an image");
      return;
    }

    toast.loading("Uploading image...", { id: toastId });
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = async (readerEvent) => {
      const imageRef = ref(storage, `profileImages/${authUser.uid}`);
      await uploadString(imageRef, readerEvent.target.result, "data_url").then(
        async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "users", authUser.uid), {
            photoURL: downloadURL,
          });
          setSelectedFile(readerEvent.target.result);
          toast.success("Image uploaded successfully", { id: toastId });
          // console.log("image uploaded");
        }
      );
    };
  };

  // Handle the Update Profile info
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setOnEdit(false);

    // Check if it has any change in the profile
    if (!profileWasUpdated) {
      toast("No changes were made");
      return;
    }

    const toastId = toast.loading("Updating profile...");

    try {
      await updateDoc(doc(db, "users", authUser.uid), {
        displayName: userDB.displayName,
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        updatedAt: serverTimestamp(),
      });
      toast.success("Profile Updated", { id: toastId });
    } catch (error) {
      toast.error(`Error updating profile: ${error}`, { id: toastId });
      setOnEdit(true);
    }
  };

  // Render Component
  return (
    <div className="flex justify-center w-full">
      <div className={"userSettings"}>
        {/* Left */}
        <div className="flex flex-col gap-5 items-center min-w-[33%]">
          {/* PhotoProfile */}
          <div className="profileContainer group" onClick={() => {}}>
            {/* Photo */}
            <div>
              <img
                src={selectedFile ? selectedFile : userDB?.photoURL}
                alt="profile"
                className="profilePhoto"
              />
              <input
                ref={newProfileImage}
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </div>
            {/* overlap background */}
            <div
              onClick={() => newProfileImage.current.click()}
              className="overlapProfileIcon "
            >
              {/* Icon */}
              <CameraIcon className="profileIcon" />
            </div>
          </div>
          {/*Actions Buttons*/}
          <div className="flex flex-col gap-1 w-full py-3 capitalize border-y  px-2 text-xs text-slate-600 dark:text-slate-200">
            <p>
              <span>Last login: </span>
              <Moment fromNow>{authUser?.metadata.lastSignInTime}</Moment>
            </p>
            <p>
              User since:{" "}
              {`${new Date(
                authUser?.metadata.creationTime
              ).toLocaleDateString()}`}
            </p>
            <p>Total Tasks: 0</p>
            <p>Completed Tasks: 0</p>
            <p>
              Login with:{" "}
              {authUser?.providerData[0].providerId.split(".")[0] === "password"
                ? "Email & Password"
                : authUser?.providerData[0].providerId.split(".")[0]}
            </p>
          </div>
          {/*reset password*/}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              {authUser?.providerData[0].providerId.split(".")[0] ===
                "password" && (
                <button
                  type="button"
                  className="transition-all-300 flex items-center justify-center gap-3 btn-dark"
                >
                  <span>
                    <KeyIcon className={"w-6 h-6"} />
                  </span>
                  Reset Password
                </button>
              )}
            </div>
            {/* Edit Info */}
            <div className="flex flex-col gap-2 w-full">
              {onEdit ? (
                <button
                  onClick={handleUpdateProfile}
                  type="button"
                  className="transition-all-300 flex items-center justify-center gap-3 btn-outline-yellow"
                >
                  <span>
                    <CloudUploadIcon strokeWidth={1} className="w-6 h-6" />
                  </span>
                  Update Info
                </button>
              ) : (
                <button
                  onClick={() => setOnEdit(!onEdit)}
                  type="button"
                  className="transition-all-300 flex items-center justify-center gap-3 btn-outline-yellow"
                >
                  <span>
                    <PencilAltIcon strokeWidth={1} className="w-6 h-6" />
                  </span>
                  Edit Info
                </button>
              )}
            </div>
            {/* Logout */}
            <div className="flex flex-col gap-2 w-full">
              <button
                type="button"
                className="btn-outline-red transition-all-300 flex items-center justify-center gap-3"
                onClick={logout}
              >
                Logout
                <span>
                  <LogoutIcon strokeWidth={1} className="w-6 h-6" />
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="flex">
          {/* UserInfo */}
          <form ref={formRef}>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <InputRounded
                name="displayName"
                type="text"
                labelText="Full Name"
                placeholder={"Display Name"}
                required=""
                disabled=""
                validate=""
                readonly={!onEdit}
                handleChange={handleInputChanges}
                value={userDB?.displayName}
              />
              <InputRounded
                name="email"
                type="email"
                styleInput={{ cursor: "no-drop" }}
                labelText="Email"
                placeholder={"Email"}
                readonly={true}
                value={userDB?.email}
              />
              <InputRounded
                name="firstName"
                type="text"
                extraClassLabel=""
                extraClassInput=""
                labelText="First Name"
                placeholder="John"
                required=""
                disabled=""
                validate=""
                readonly={!onEdit}
                handleChange={handleInputChanges}
                value={userDB?.firstName}
              />
              <InputRounded
                name="lastName"
                type="text"
                extraClassLabel=""
                extraClassInput=""
                labelText="Last Name"
                placeholder="Due"
                required=""
                disabled=""
                validate=""
                readonly={!onEdit}
                handleChange={handleInputChanges}
                value={userDB?.lastName}
              />
            </div>
          </form>

          {/* Button to edit and Update */}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
