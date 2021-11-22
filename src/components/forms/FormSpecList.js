import DataTable from "../DataTable";
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import { Button, Typography } from "@material-ui/core";

const MAX_TEXT_LENGTH = 50;

const useStyles = makeStyles({
    root: {
      width: '100%'
    },
    addButton: {
        margin: 10
    },
    title: {
        paddingTop: 20
    }
});

const truncateSpec = (value) => {
    let strValue = JSON.stringify(value);
    if (strValue.length > MAX_TEXT_LENGTH) {
        return strValue.substring(0, MAX_TEXT_LENGTH) + "...";
    }
    return strValue;
}

const FormSpecList = (props) => {
    const {form} = props;
    const header = [
        { id: 'id', label: '#', minWidth: 30 },
        { id: 'spec', label: 'Spec', minWidth: 100, format: truncateSpec },
        { id: 'parsed_spec', label: 'Prsed Spec', minWidth: 100, format: truncateSpec },
    ]
    const classes = useStyles();

    return (
        <>
            {form && 
                <div className={classes.root}>
                    <Typography component="div" variant="h6" color="inherit" className={classes.title}>
                        Form Spec List
                    </Typography>
                    <div align="left">
                        <Button className={classes.addButton} variant="contained" color="secondary" component={Link} startIcon={<LibraryAdd />} to={`/forms/${form.id}/specs/new`}>Create new Form Spec</Button>
                        <Button className={classes.addButton} variant="contained" color="secondary" component={Link} startIcon={<AssignmentTurnedIn />} to={`/forms/${form.id}/specs/values/new`}>Fill all Form Spec Values</Button>
                        <Button className={classes.addButton} variant="contained" color="secondary" component={Link} startIcon={<AssignmentTurnedIn />} to={`/forms/${form.id}/specs/values/preview`}>Preview Form as YAML</Button>
                    </div>
                    <DataTable header={header} uri={`/forms/${form.id}/specs`}/>
                </div>
            }
        </>
    )
}

export default FormSpecList;