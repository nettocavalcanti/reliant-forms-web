import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { useParams } from "react-router-dom";
import DataTable from "../../../DataTable";

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

    const header = [
        { id: 'id', label: '#', minWidth: 30 },
        { id: 'key', label: 'Key', minWidth: 100 },
        { id: 'value', label: 'Value', minWidth: 80 }
    ]

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit" component="h2" className={classes.title}>
                Spec Values
            </Typography>
            <DataTable header={header} uri={`/forms/${params.form_id}/specs/${params.spec_id}/values`}/>
        </div>
    )
}

export default FormSpecValueList;