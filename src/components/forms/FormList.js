import DataTable from "../DataTable";
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import PostAdd from '@material-ui/icons/PostAdd';
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      width: '100%'
    },
    addButton: {
        left: -345,
        margin: 10
    }
});

const FormList = () => {
    const header = [
        { id: 'id', label: '#', minWidth: 30 },
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'form_specs_count', label: 'Specs qty.', minWidth: 30 }
    ]

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h4>Form List</h4>
            <Button className={classes.addButton} variant="contained" color="secondary" component={Link} startIcon={<PostAdd />} to="/forms/new">Create new Form</Button>
            <DataTable header={header} uri="/forms"/>
        </div>
    );
}

export default FormList;