import { Link } from "react-router-dom";

// Define a NavLink component to use in the navigation bar
const NavLink = ({ to, children, icon: Icon }) => (
    <Link
        to={to}
        className="flex items-center rounded-xl px-1 py-2 transition-all hover:bg-gray-200 active:bg-gray-300 md:px-2"
    >
        <Icon aria-hidden="true" className="h-auto max-w-[1.3rem] lg:max-w-[1.6rem]" />
        <span className="pl-0.5 lg:pl-1">{children}</span>
    </Link>
);

export default NavLink;
