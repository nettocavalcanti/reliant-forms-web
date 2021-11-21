import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ThumbUp } from "@material-ui/icons";

const Home = () => {
    return (
        <div>
            <h1>Custom Form Builder</h1>
            <h5>Welcome to the best web application for building custom Forms!</h5>

            <h6>Start today your own form clicking the link below!</h6>
            <Button variant="contained" color="secondary" component={Link} startIcon={<ThumbUp />} to="/forms">Show me what you got!</Button>
        </div>
    );
}

export default Home;