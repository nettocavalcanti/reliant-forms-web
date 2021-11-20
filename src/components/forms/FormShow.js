import { useParams } from "react-router-dom";

const FormShow = () => {
    const params = useParams();

    return (
        <h6>Hello {params.form_id}</h6>
    )
}

export default FormShow;