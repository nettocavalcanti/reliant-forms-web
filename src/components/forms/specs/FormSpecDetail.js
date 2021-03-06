import { Button, Typography } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../services/apiService";
import Loading from "../../Loading";
import FormSpecYMLView from './FormSpecYMLView';

import { makeStyles } from '@material-ui/styles';
import FormSpecValueList from "./values/FormSpecValueList";

const useStyles = makeStyles({
    title: {
        padding: 20
    }
});

const FormSpecDetail = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [spec, setSpec] = useState();
    const [form, setForm] = useState();
    const [values, setValues] = useState([])

    const classes = useStyles();

    useEffect(() => {
        fetchFormInfo(params.form_id);
        fetchSpecInfo(params.form_id, params.spec_id);
        fetchValues(params.form_id, params.spec_id)
    }, [params.form_id, params.spec_id]);

    const fetchFormInfo = (formId) => {
        setLoading(true)
        api.get(`/forms/${formId}`)
        .then((response) => {
            setForm(response.data);
        })
        .finally(() => setLoading(false));
    }

    const fetchSpecInfo = (formId, specId) => {
        setLoading(true)
        api.get(`/forms/${formId}/specs/${specId}`)
        .then((response) => {
            setSpec(response.data);
        })
        .finally(() => setLoading(false));
    }

    const fetchValues = (formId, specId) => {
        api.get(`/forms/${formId}/specs/${specId}/values`)
        .then((response) => {
            setValues(response.data)
        })
    }

    return (
        <>
            {loading ?
                <Loading />
                :
                <>
                    <Typography component="h4" variant="h4" color="inherit" className={classes.title}>
                        Spec #{spec && spec.id} for form '{form && form.name}'
                    </Typography>
                    <Button variant="contained" color="secondary" component={Link} startIcon={<PostAdd />} to={`/forms/${params.form_id}/specs/${params.spec_id}/values/new`}>Create new values for spec</Button>
                    <FormSpecYMLView spec={spec} values={values} />
                    <FormSpecValueList values={values} />
                </>
            }
        </>
    )
}

export default FormSpecDetail;