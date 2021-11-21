import { Button, Grid, Paper, Typography, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/styles';
import api from "../../../services/apiService";
import Messages from "../../../services/messages";

const useStyles = makeStyles({
    title: {
      padding: 10,
      fontSize: 34,
      fontWeight: "bold"
    },
    container: {
        margin: 10,
        padding: 10,
        width: '100%'
    },
    containerField: {
        textAlign: 'left'
    },
    input: {
        width: '90%'
    }
});

const FormSpecCreate = (props) => {
    const {form} = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [spec, setSpec] = useState('');
    const navigate = useNavigate();

    const classes = useStyles();

    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // If we do not use formData, reactJs cant send mainImage binary info to server
        api.post(`/forms/${params.form_id}/specs`, {form_spec: {spec: spec}})
        .then(() => {
            setLoading(false);
            navigate(`/forms/${params.form_id}`);
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
                    <Typography component="h4" variant="h4" color="initial">
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
                                            multiline
                                            minRows={2}
                                            maxRows={4}
                                            placeholder="JSON Spec"
                                            fullWidth
                                            name="spec"
                                            variant="standard"
                                            color="secondary"
                                            value={spec}
                                            onChange={(event) =>
                                                setSpec(event.target.value)
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
    );
}

export default FormSpecCreate;