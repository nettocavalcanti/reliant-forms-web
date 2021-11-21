import { Button, Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/styles';
import api from "../../../services/apiService";
import Messages from "../../../services/messages";
import theme from "../../themes/theme";
import JSONView from "./JSONView";

const useStyles = makeStyles({
    root: {
        width: '90%',
        paddingTop: 20
    },
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
        backgroundColor: theme.palette.secondary.light,
        width: '100%'
    },
    submitButton: {
        marginBottom: 10
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
        <div className={classes.root}>
            <Typography variant="h6" color="inherit" component="h2" className={classes.title}>
                Create a new Form Spec
            </Typography>
            
            <Paper elevation={3}>
                <form onSubmit={handleSubmit}>
                    <JSONView onChange={setSpec}/>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default FormSpecCreate;