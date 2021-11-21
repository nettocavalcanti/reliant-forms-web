import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import theme from "../themes/theme";

const useStyles = makeStyles({
    title: {
      padding: 20,
      fontSize: 34,
      fontWeight: "bold"
    },
    container: {
        margin: 10,
        padding: 10,
        width: '100%',
        backgroundColor: theme.palette.secondary.light
    },
    containerField: {
        textAlign: 'left'
    },
    input: {
        width: '90%'
    }
});

const FormDetailInfo = (props) => {
    const {form} = props;
    const classes = useStyles();

    return (
        <>
            {form && 
                <Grid container>
                    <Typography component="h4" variant="h4" color="inherit" className={classes.title}>
                        Form details
                    </Typography>
                    <Paper variant="outlined" elevation={6} className={classes.container}>
                        <Grid container direction="row">
                            <Grid item xs={6} className={classes.containerField}>
                                <TextField label="Name" value={form.name} variant="standard" className={classes.input}/>
                            </Grid>
                            <Grid item xs={4} className={classes.containerField}>
                                <TextField label="Created At" value={form.created_at} type="datetime" InputLabelProps={{shrink: true}} className={classes.input}/>
                            </Grid>
                            <Grid item xs={2} className={classes.containerField}>
                                <TextField label="Total Spec qty." value={form.form_specs_count} className={classes.input}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            }
        </>
    )
}

export default FormDetailInfo;