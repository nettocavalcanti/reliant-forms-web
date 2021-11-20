import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/apiService";

const FormDetail = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState();

    useEffect(() => {
        fetchFormInfo(params.form_id);
    }, [params.form_id]);

    const fetchFormInfo = (formId) => {
        setLoading(true)
        api.get(`/forms/${formId}`)
        .then((response) => {
            setForm(response.data);
        })
        .finally(() => setLoading(false));
    }

    return (
        <>
            {loading ?
                <h4>Loading...</h4>
                :
                form && <h4>{form.name}</h4>
            }
        </>
    )
}

export default FormDetail;