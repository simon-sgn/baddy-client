import { Link } from "react-router-dom";
import NavLink from "../navLink/navLink";
import { ReactComponent as BaddyLogo } from "../../assets/baddy.svg";
import { ReactComponent as FindIcon } from "../../assets/find.svg";
import { ReactComponent as MessagesIcon } from "../../assets/messages.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";

// Define a navigation bar component for the app
const NavigationBar = () => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="mx-auto flex h-[4.5rem] max-w-[1280px] flex-row justify-between bg-white text-sm text-indigo-900 md:text-base">
                <Link to="/" className="cursor-pointer py-2 pl-2 md:pl-6">
                    <BaddyLogo className="h-auto max-w-[6.5rem] lg:max-w-[7rem]" />
                </Link>
                <div className="mr-1.5 flex items-center space-x-2 md:mr-3 md:space-x-8 lg:mr-5">
                    <NavLink to="/" icon={FindIcon}>
                        Find
                    </NavLink>
                    <NavLink to="/messages" icon={MessagesIcon}>
                        Messages
                    </NavLink>
                    <NavLink to="/my-profile" icon={ProfileIcon}>
                        Profile
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
