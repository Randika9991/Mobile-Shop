import { Link } from "react-router-dom";

export const Logo = ({ to, name }) => {
    return (
        <Link to={to} className="flex items-center">
            <img
                alt="Logo"
                src="https://img.icons8.com/?size=100&id=I8FBq9ECZxUb&format=png&color=000000"
                className="h-8 w-auto"
            />
            <span className="ml-2 text-lg font-semibold text-gray-900">{name}</span>
        </Link>
    );
};