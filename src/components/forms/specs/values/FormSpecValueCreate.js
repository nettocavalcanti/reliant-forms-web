import { Button, Grid, Paper, Typography, TextField, Select, FormControl, MenuItem, InputLabel } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/styles';
import api from "../../../../services/apiService";
import Messages from "../../../../services/messages";

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

const FormSpecValueCreate = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [key, setKey] = useState('');
    const [keys, setKeys] = useState([]);
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const classes = useStyles();

    const params = useParams();

    useEffect(() => {
        fetchFormSpecKeys(params.form_id, params.spec_id)
    }, [params.form_id, params.spec_id])

    const fetchFormSpecKeys = (formId, specId) => {
        setLoading(true);
        api.get(`/forms/${formId}/specs/${specId}/keys`)
        .then((response) => {
            setKeys(response.data.keys)
        })
        .finally(() => setLoading(false))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // If we do not use formData, reactJs cant send mainImage binary info to server
        api.post(`/forms/${params.form_id}/specs/${params.spec_id}/values`, {form_spec_value: {key: key, value: value}})
        .then(() => {
            setLoading(false);
            navigate(`/forms/${params.form_id}/specs/${params.spec_id}`);
        })
        .catch(error => {
            setLoading(false);
            console.warn(error.response)
            setError(Messages.treatMessage(error.response));
        });
    }

    return (
        <Grid container spacing={0} justifyContent="center" direction="row" className={classes.root}>
            <Grid item>
                <Grid item>
                    <Typography component="h4" variant="h4" color="initial">
                        Create a new Spec Value
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
                                        <FormControl style={{width: '100%'}} variant="standard">
                                            <InputLabel id="demo-simple-select-required-label">Key</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={key}
                                                label="Key *"
                                                style={{width: '100%'}}
                                                onChange={(event) => setKey(event.target.value)}
                                            >
                                            {keys && keys.map((key) => {
                                                return (
                                                    <MenuItem key={key.key} value={key.value}>{key.key}</MenuItem>
                                                )
                                            })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            type="text"
                                            multiline
                                            minRows={2}
                                            maxRows={4}
                                            placeholder="Value"
                                            fullWidth
                                            name="value"
                                            variant="standard"
                                            color="secondary"
                                            value={value}
                                            onChange={(event) =>
                                                setValue(event.target.value)
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

export default FormSpecValueCreate;