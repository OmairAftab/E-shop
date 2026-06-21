import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../Styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const CreateShopComponent = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate()




// Two separate states are needed because the base64 string and the actual File
// object serve completely different purposes — one is for display, one is for upload.

const [avatar, setAvatar] = useState();
// Holds a base64 DATA URL (a long text string like "data:image/png;base64,iVBORw0...").
// USE: only for the <img src={avatar}> preview shown to the user after they pick a file.
// WHY: browsers can render base64 strings directly in an <img> tag, so this gives
// instant visual feedback without needing to upload anything yet.
// LIMITATION: this is just text — it is NOT a real file, so it can't be sent to
// multer on the backend. Sending this to req.file via FormData will fail, because
// multer expects actual binary file data, not a base64 string.

const [avatarFile, setAvatarFile] = useState();
// Holds the actual File object as given by the browser (e.target.files[0]).
// USE: this is what actually gets sent to the backend via FormData.append("file", avatarFile).
// WHY: multer (the middleware handling file uploads on the backend) only knows how
// to parse real File/Blob data sent in a multipart/form-data request — it cannot
// parse a base64 string. So this state preserves the original File object untouched,
// separate from the base64 conversion happening for the preview.
  
  
  
  
  




const handleSubmit = async (e) => {
  e.preventDefault();

  const newForm = new FormData();
  newForm.append("file", avatarFile); // the real File object
  newForm.append("name", name);
  newForm.append("email", email);
  newForm.append("password", password);
  newForm.append("zipCode", zipCode);
  newForm.append("address", address);
  newForm.append("phoneNumber", phoneNumber);

  axios
    .post(`${server}/shop/create-shop`, newForm)
    .then((res) => {
      toast.success("Shop created successfully! Please login to your shop account.");
      setTimeout(() => {
        navigate("/shop-login");
      }, 1500);

      setName("");
      setEmail("");
      setPassword("");
      setAvatar();
      setAvatarFile();
      setZipCode();
      setAddress("");
      setPhoneNumber();
    })
    .catch((error) => {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(msg);
    });
};





  const handleFileInputChange = (e) => {
  const file = e.target.files[0];
  // e.target.files[0] is the real File object selected by the user.

  setAvatarFile(file);
  // Save the real File object immediately — this is what we'll upload later. We do this BEFORE the FileReader logic below, 
  // since FileReader is async and only needed for the preview, not for the upload itself.

  const reader = new FileReader();
  // FileReader is a browser API used to read file contents — here we use it ONLY to generate a preview image, not for the actual upload.

  reader.onload = () => {
    // Runs after the file has been fully read into memory.
    if (reader.readyState === 2) {
      // readyState === 2 means "DONE" — the read completed successfully.
      setAvatar(reader.result);
      // reader.result is the base64 data URL — store it purely so <img src={avatar}> can show a live preview before submitting the form.
    }
  };

  reader.readAsDataURL(file);
  // Triggers the async read, converting the File into a base64 string. This only affects the `avatar` preview state — it has zero effect on
  // `avatarFile`, which already holds the original File object for upload.
};




  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone-number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipcode"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default CreateShopComponent