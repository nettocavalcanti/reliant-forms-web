import DataTable from "../DataTable";
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import { Button } from "@material-ui/core";

const MAX_TEXT_LENGTH = 50;

const useStyles = makeStyles({
    root: {
      width: '100%'
    },
    addButton: {
        margin: 10
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
                    <h4>Form Spec List</h4>
                    <div align="left">
                        <Button className={classes.addButton} variant="contained" color="secondary" component={Link} startIcon={<LibraryAdd />} to={`/forms/${form.id}/specs/new`}>Create new Form Spec</Button>
                    </div>
                    <DataTable header={header} uri={`/forms/${form.id}/specs`}/>
                </div>
            }
        </>
    )
}

export default FormSpecList;