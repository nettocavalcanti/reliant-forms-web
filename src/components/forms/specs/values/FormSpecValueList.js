import { Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { useParams } from "react-router-dom";
import DataTable from "../../../DataTable";
import { RemoveRedEye, Edit } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        width: '90%',
        paddingTop: 20
    },
    title: {
        marginLeft: 20,
        flex: 1,
        textAlign: 'left'
    }
});

const FormSpecValueList = () => {
    const params = useParams();
    const classes = useStyles();

    const handlePreviewClick = (event, row) => {
        event.preventDefault();
    }

    const handleEditClick = (event, row) => {
        event.preventDefault();
    }

    const buildPreviewButton = (row) => {
        return <Button onClick={(event) => handlePreviewClick(event, row)} startIcon={<RemoveRedEye />}></Button>;
    }

    const buildEditButton = (row) => {
        return <Button startIcon={<Edit onClick={(event) => handleEditClick(event, row)} />}></Button>
    }

    const header = [
        { id: 'id', label: '#', minWidth: 30 },
        { id: 'key', label: 'Key', minWidth: 80 },
        { id: 'value', label: 'Value', minWidth: 80 },
        { id: 'preview', label: 'Preview', minWidth: 40, buildCustomComponent: buildPreviewButton},
        { id: 'edit', label: 'Edit', minWidth: 40, buildCustomComponent: buildEditButton}
    ]

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit" component="h2" className={classes.title}>
                Spec Values
            </Typography>
            <DataTable header={header} uri={`/forms/${params.form_id}/specs/${params.spec_id}/values`} dontRedirectToDetails={true}/>
        </div>
    )
}

export default FormSpecValueList;