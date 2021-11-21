import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import jsyaml from 'js-yaml'

import Loading from "../../Loading";
import YMLView from "./YMLView";

const useStyles = makeStyles({
    root: {
        width: '90%',
        paddingTop: 20
    },
    title: {
        flex: 1,
        textAlign: 'left'
    }
});

const FormSpecYMLView = (props) => {
    const {spec} = props;

    const classes = useStyles();

    const parseYml = (parsedSpec) => {
        return jsyaml.dump(parsedSpec);
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit" component="h2" className={classes.title}>
                YML Template Preview
            </Typography>
            <Paper elevation={3}>
                {spec ? 
                    <YMLView yml={parseYml(spec.parsed_spec)} />
                    : 
                    <Loading />
                }
            </Paper>
        </div>
    )
}

export default FormSpecYMLView;