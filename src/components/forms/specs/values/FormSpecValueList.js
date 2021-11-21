import { IconButton, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import DataTable from "../../../DataTable";
import { RemoveRedEye, Edit } from "@material-ui/icons";
import theme from "../../../themes/theme";

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

const FormSpecValueList = (props) => {
    const classes = useStyles();
    const {values} = props;

    const handleEditClick = (event, row) => {
        event.preventDefault();
    }

    const buildEditButton = (row) => {
        return (
            <IconButton onClick={(event) => handleEditClick(event, row)} style={{color: theme.palette.primary.light}}>
                <Edit />
            </IconButton>
        )
    }

    const header = [
        { id: 'id', label: '#', minWidth: 30 },
        { id: 'key', label: 'Key', minWidth: 80 },
        { id: 'value', label: 'Value', minWidth: 80 },
        { id: 'edit', label: 'Edit', minWidth: 40, buildCustomComponent: buildEditButton}
    ]

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit" component="h2" className={classes.title}>
                Spec Values
            </Typography>
            <DataTable header={header} rows={values} dontRedirectToDetails={true}/>
        </div>
    )
}

export default FormSpecValueList;