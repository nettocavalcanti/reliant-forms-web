import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/apiService";
import FormSpecYMLView from './FormSpecYMLView';

const FormSpecDetail = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [spec, setSpec] = useState();

    useEffect(() => {
        fetchSpecInfo(params.form_id, params.spec_id);
    }, [params.form_id, params.spec_id]);

    const fetchSpecInfo = (formId, specId) => {
        setLoading(true)
        api.get(`/forms/${formId}/specs/${specId}`)
        .then((response) => {
            setSpec(response.data);
        })
        .finally(() => setLoading(false));
    }

    return (
        <>
            {loading ?
                <h4>Loading...</h4>
                :
                <FormSpecYMLView spec={spec} />
            }
        </>
    )
}

export default FormSpecDetail;