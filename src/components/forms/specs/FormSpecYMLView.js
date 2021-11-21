import { useState } from "react";
import ToggleIcon from "material-ui-toggle-icon";
import { IconButton, Paper, Typography, Tooltip } from "@material-ui/core";
import { Visibility, Code } from "@material-ui/icons";
import { makeStyles } from '@material-ui/styles';
import fillSpecWithValues from "../../../services/yamlUtils";

import Loading from "../../Loading";
import YMLView from "./YMLView";
import theme from "../../themes/theme";

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

const FormSpecYMLView = (props) => {
    const { spec, values } = props;
    const [showCode, setShowCode] = useState(false);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit" component="h2" className={classes.title}>
                <Tooltip title={showCode ? "Show preview" : "Show Code"} placement="bottom">
                    <IconButton className={classes.toggleButton} color="secondary" onClick={() => setShowCode(!showCode)} >
                        <ToggleIcon on={showCode} onIcon={<Visibility />} offIcon={<Code />}/>
                    </IconButton>
                </Tooltip>
                YML Template Preview
            </Typography>
            
            <Paper elevation={3}>
                {spec ?
                    showCode ? <YMLView yml={fillSpecWithValues(spec.parsed_spec, [])} /> : <YMLView yml={fillSpecWithValues(spec.parsed_spec, values)} />
                    :
                    <Loading />
                }
            </Paper>
        </div>
    )
}

export default FormSpecYMLView;