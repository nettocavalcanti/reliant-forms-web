import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/styles';
import { useParams } from "react-router";
import { Paper, Typography } from "@material-ui/core";
import fillSpecWithValues from "../../../services/yamlUtils";

import Loading from "../../Loading";
import YMLView from "./YMLView";
import theme from "../../themes/theme";
import api from "../../../services/apiService";

const useStyles = makeStyles({
    root: {
        width: '90%',
        paddingTop: 20
    },
    title: {
        flex: 1,
        textAlign: 'left'
    },
    toggleButton: {
        backgroundColor: theme.palette.primary.dark,
        padding: 5,
        margin: 5
    }
});

const FormSpecValuePreview = () => {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [yml, setYml] = useState('')
    const classes = useStyles();
    const params = useParams();

    const getFormSpecValue = (key, form_specs_values) => {
        const filteredValues = form_specs_values.filter((value) => value.key === key)
        if (filteredValues && filteredValues.length === 1) {
            return filteredValues[0].value
        }
    }

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
                    values.push({id: spec.id, key: spec.key, value: getFormSpecValue(spec.value, form.form_specs_values)})
                });
                fillFullYmlForm(form)
            })
            .finally(() => setLoading(false));
    }

    const fillFullYmlForm = (form) => {
        let fullYml = []
        if (form && form.full_parsed_spec) {

            form.full_parsed_spec.forEach((spec) => {
                const specValues = form.form_specs_values.filter((spec_value) => spec_value.key === getFirstKeyIgnoringId(spec))
                fullYml.push(fillSpecWithValues(spec, specValues))
            })
            setYml(fullYml.join(""))
        }
    }

    useEffect(() => {
        fetchForm(params.form_id)
    }, [params.form_id]);

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit" component="h2" className={classes.title}>
                YML Template Preview
            </Typography>
            
            <Paper elevation={3}>
                {loading && !form ?
                    <Loading />
                    :
                    <YMLView yml={yml} />
                }
            </Paper>
        </div>
    )
}

export default FormSpecValuePreview;