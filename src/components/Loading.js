import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const Loading = () => {
    const classes = useStyles();

    return (
        <Box sx={{ display: 'flex' }} className={classes.root}>
            <CircularProgress />
        </Box>
    )
}

export default Loading;