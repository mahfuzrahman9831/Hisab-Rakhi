import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
      
      {/* Left Side */}
      <div className="flex items-center gap-3">
        
        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX2H_fay-rzVNicx0KewIPIL6ccnFvjJJpzUdHbkItYGlBoxCMvnXCCrnQt4v37zpjlt6QlXzZx_7--3Pu9RIb6FsYVvxRwZTpU8QLwc6fnccgz84Di9ZqsTYcvfOaxoIiI2YJWkd5wlX1I1U4hzlB1pXhWUluP9Z4JDZBIYLVpqYZpp0yluJ7TDAYvt7-yneYMqAiqgJLV86sAK1bBrjXn2lwJ9iOUCopwUiw9v0dvk5HOIUzVyzvW-aSR3Uescy3y3LU6O4DXUpm"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Store Info */}
        <div>
          <h1 className="text-lg font-bold leading-tight text-slate-900">
            Mayer Doa Store
          </h1>
          <p className="text-xs text-gray-500">
            Good Morning, Rahim
          </p>
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="flex gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <IoNotificationsOutline size={20} className="text-gray-600" />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <HiOutlineDotsVertical size={20} className="text-gray-600" />
        </button>
      </div>

    </header>
  );
}