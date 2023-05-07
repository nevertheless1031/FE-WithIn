import { useState } from "react";
import { FaCamera } from "react-icons/fa";

export const Mypage = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [image, setImage] = useState("https://via.placeholder.com/150");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mt-8">
          {/* Profile picture */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={image} alt="Profile" />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <label htmlFor="image" className="cursor-pointer">
                <FaCamera className="text-white text-2xl" />
              </label>
              <input type="file" id="image" className="hidden" onChange={handleImageChange} />
            </div>
          </div>
        </div>
        <div className="mt-4 px-4 py-2">
          {/* Name */}
          <div className="mb-2">
            <label className="block font-bold text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            {editMode ? (
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                name="name"
              />
            ) : (
              <p className="text-md text-gray-500">{name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-2">
            <label className="block font-bold text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            {editMode ? (
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                name="email"
              />
            ) : (
              <p className="text-md text-gray-500">{email}</p>
            )}
          </div>

          {/* Edit mode toggle button */}
          <div className="mt-4">
            <button
              className={`${
                editMode ? "bg-mainPurple hover:bg-gray-700" : "bg-mainPurple hover:bg-indigo-700"
              } text-white font-bold py-2 px-4 rounded`}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
