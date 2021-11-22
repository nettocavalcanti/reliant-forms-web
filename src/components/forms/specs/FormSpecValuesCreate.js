import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from "react-router";
import api from "../../../services/apiService";
import { Paper, Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import theme from "../../themes/theme";
import Messages from "../../../services/messages";

const useStyles = makeStyles({
    formBackground: {
        justifyContent: 'center',
        minHeight: '30vh',
        padding: 50,
        backgroundColor: theme.palette.secondary.light,
        marginTop: 30
    },
    formFooter: {
        marginTop: 20
    },
    submitButton: {
        marginBottom: -100
    }
});

const FormSpecValuesCreate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({});
    const [request, setRequest] = useState([])
    const navigate = useNavigate();

    const classes = useStyles();

    const params = useParams();

    const getFirstKeyIgnoringId = (hash) => {
        return Object.keys(hash).filter((key) => key !== 'id')[0]
    }

    const fetchForm = (formId) => {
        setLoading(true);
        api.get(`/forms/${formId}/all_data`)
            .then((response) => {
                setForm(response.data);
                return response.data;
            })
            .then((form) => {
                let values = []
                form.form_specs.forEach((spec) => {
                    const key = getFirstKeyIgnoringId(spec);
                    values.push({
                        id: spec.id,
                        key: key,
                        value: getFormSpecValue(spec[key], form.form_specs_values)
                    })
                });
                setRequest(values);
            })
            .finally(() => setLoading(false));
    }

    const getRequestValue = (key) => {
        const value = request.filter((req) => req.key === key)
        if (value && value.length === 1) {
            return request.filter((req) => req.key === key)[0].value
        }
        return ""
    }

    const setValue = (id, key, value) => {
        let currentRequest = [...request]
        if (currentRequest.filter((req) => req.key === key).length === 0) {
            currentRequest.push({id: id, key: key, value: value})
        } else {
            currentRequest.filter((req) => req.key === key)[0].value = value
        }
        
        setRequest(currentRequest);
    }

    useEffect(() => {
        fetchForm(params.form_id)
    }, [params.form_id]);

    const getFormSpecValue = (key, form_specs_values) => {
        const filteredValues = form_specs_values.filter((value) => value.key === key)
        if (filteredValues && filteredValues.length === 1) {
            return filteredValues[0].value
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // If we do not use formData, reactJs cant send mainImage binary info to server
        api.post(`/forms/${params.form_id}/all_data`, { form_values: request })
            .then(() => {
                setLoading(false);
                navigate('/forms');
            })
            .catch(error => {
                setLoading(false);
                setError(Messages.treatMessage(error.response));
            });
    }

    return (
        <>
            <Paper
                variant="elevation"
                elevation={2}
                className={classes.formBackground}
            >
                <form onSubmit={handleSubmit}>
                    {
                        form && form.form_specs && form.form_specs_values && form.form_specs.map((form_spec) => {
                            const key = getFirstKeyIgnoringId(form_spec);
                            return (
                                <TextField
                                    type="text"
                                    placeholder={key}
                                    fullWidth
                                    name={key}
                                    label={key}
                                    variant="standard"
                                    color="secondary"
                                    value={getRequestValue(key)}
                                    onChange={(event) =>
                                        setValue(form_spec.id, key, event.target.value)
                                    }
                                />
                            )
                        })
                    }
                    {error && <Alert severity="error">{error}</Alert>}
                    <div className={classes.formFooter}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                            className={classes.submitButton}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
        </>
    )
}

export default FormSpecValuesCreate;