const Profile = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-8 ">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="flex items-center justify-center mt-10">
        <img
          src="https://via.placeholder.com/40x40.png?text=V"
          alt="Avatar"
          className="w-40 h-40 rounded-full object-cover border"
        />
      </div>

      <div className="flex items-start justify-start mt-12 flex-col">
        <h6 className="text-gray-400">Your Name</h6>
        <h6 className="text-gray-400 mt-5 capitalize">Manish</h6>
      </div>
    </div>
  );
};

export default Profile;
