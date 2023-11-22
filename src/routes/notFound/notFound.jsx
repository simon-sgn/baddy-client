import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import buttonTypeClasses from "../../components/button/buttonTypeClasses";

// Create a component that renders a 404 Not Found page
const NotFound = () => {
    // Get the navigate function from useNavigate hook
    const navigate = useNavigate();
    return (
        <div className="mt-20 md:mt-32 lg:mt-40">
            <h1 className="font-extrabold uppercase">404 Not Found</h1>
            <p className="m-5">
                Sorry, the page you requested at&nbsp;
                <span className="font-bold">{window.location.href}</span> does not exist.
            </p>
            <Button
                type="button"
                buttonType={buttonTypeClasses.invertedButton}
                className="mx-auto max-w-[18rem]"
                onClick={() => navigate("/")}
            >
                Go to homepage &gt;
            </Button>
        </div>
    );
};

export default NotFound;
