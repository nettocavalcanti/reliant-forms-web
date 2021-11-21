import { Button, Grid, Paper, Typography, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/styles';
import api from "../../../services/apiService";
import Messages from "../../../services/messages";
import theme from "../../themes/theme";

const useStyles = makeStyles({
    title: {
      padding: 20,
      fontSize: 34,
      fontWeight: "bold"
    },
    contentForm: {
        justifyContent: 'center',
        paddingTop: 20,
        width: '100%'
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
    },
    formBackground: {
        justifyContent: 'center',
        minHeight: '30vh',
        //padding: 50,
        backgroundColor: theme.palette.secondary.light,
        width: '100%'
    }
});

const FormSpecCreate = (props) => {
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
            setError(Messages.treatMessage(error.response));
        });
    }

    return (
        <Grid container spacing={0} justifyContent="center" direction="row" className={classes.root}>
            <Grid item>
                <Grid item>
                    <Typography component="h4" variant="h4" color="inherit" className={classes.title}>
                        Create a new Form Spec
                    </Typography>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                    <Paper
                        variant="elevation"
                        elevation={2}
                        className={classes.formBackground}
                    >
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <TextField
                                            type="text"
                                            multiline
                                            minRows={20}
                                            maxRows={40}
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
        </Grid>
    );
}

export default FormSpecCreate;