import { ReactComponent as SadLogo } from "../../assets/sad.svg";

// Define a general error message to show to the users
const ErrorMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10">
            <SadLogo aria-hidden="true" className="h-auto max-w-[5rem] p-3 lg:max-w-[8rem]" />
            <p className="max-w-[30rem] rounded-md bg-indigo-800 p-3 text-sm">
                We apologize for the inconvenience. Something went wrong with our web app. Please
                try refreshing the page, or check your internet connection. If the problem persists,
                please contact us at&nbsp;
                <a href="mailto:simonnguyen.sgn@gmail.com">simonnguyen.sgn@gmail.com</a>
                .
                <br />
                <br />
                We appreciate your patience and understanding.
            </p>
        </div>
    );
};

export default ErrorMessage;
