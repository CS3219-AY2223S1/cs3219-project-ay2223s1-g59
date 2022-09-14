import { Link, useNavigate } from "react-router-dom";
import NavBar from './NavBar.js';

const SearchPage = (event) => {
    const navigate = useNavigate()

    return (
        <>
            <NavBar/>
        </>
    )
}


export default SearchPage;