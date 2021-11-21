import { Button, Grid, Paper, Typography, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useNavigate } from "react-router";
import { makeStyles } from '@material-ui/styles';
import api from "../../services/apiService";
import Messages from "../../services/messages";
import theme from "../themes/theme";

const useStyles = makeStyles({
    root: {
        paddingTop: 20
    },
    contentForm: {
        justifyContent: 'center',
        paddingTop: 20,
        width: 400
    },
    buttonBlock: {
        width: '100%',
        bottom: -150
    },
    formBackground: {
        justifyContent: 'center',
        minHeight: '30vh',
        padding: 50,
        backgroundColor: theme.palette.secondary.light
    }
});

const FormCreate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // If we do not use formData, reactJs cant send mainImage binary info to server
        api.post('/forms', {form: {name: name}})
        .then(() => {
            setLoading(false);
            navigate('/forms');
        })
        .catch(error => {
            setLoading(false);
            setError(
                (error.response && error.response.data && error.response.data.error) || Messages.SERVER_COMMUNICATION_FAILURE
            );
        });
    }

    return (
        <Grid container spacing={0} justifyContent="center" direction="row" className={classes.root}>
            <Grid item>
                <Grid item>
                    <Typography component="h4" variant="h4" color="inherit">
                        Create a new Form
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    className={classes.contentForm}
                >
                    <Paper
                        variant="elevation"
                        elevation={2}
                        className={classes.formBackground}
                    >
                        <Grid item>
                            <form onSubmit={handleSubmit}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <TextField
                                            type="text"
                                            placeholder="Name"
                                            fullWidth
                                            name="name"
                                            variant="standard"
                                            color="secondary"
                                            value={name}
                                            onChange={(event) =>
                                                setName(event.target.value)
                                            }
                                            required
                                            autoFocus
                                        />
                                    </Grid>
                                    {error && <Grid item>
                                        <Alert severity="error">{error}</Alert>
                                    </Grid>}
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={classes.buttonBlock}
                                            disabled={loading}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FormCreate;