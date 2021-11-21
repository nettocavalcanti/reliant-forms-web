import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ThumbUp } from "@material-ui/icons";

const Home = () => {
    return (
        <div>
            <Typography variant="h4" color="textPrimary" component="div" style={{ flex: 1, paddingTop: 20, fontWeight: 'bold' }}>
                Custom Form Builder
            </Typography>
            <Typography variant="h5" color="textPrimary" component="div" style={{ flex: 1, paddingTop: 20, fontWeight: 'bold' }}>
                Welcome to the best web application for building custom Forms!
            </Typography>

            <Typography variant="h6" color="textPrimary" component="div" style={{ flex: 1, paddingTop: 20, fontWeight: 'bold', paddingBottom: 20 }}>
                Start today your own form clicking the link below!
            </Typography>

            <Button variant="contained" color="secondary" component={Link} startIcon={<ThumbUp />} to="/forms">Show me what you got!</Button>
        </div>
    );
}

export default Home;