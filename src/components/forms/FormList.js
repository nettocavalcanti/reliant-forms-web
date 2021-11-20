import { Box, Container, Grid } from "@material-ui/core";
import DataTable from "../DataTable";

const FormList = () => {
    const header = [
        { id: 'id', label: '#', minWidth: 30 },
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'form_specs_count', label: 'Specs qty.', minWidth: 30 }
    ]

    return (
        <>
            <h4>Form List</h4>
            
            <Box color="white" width="100%">
                <Container maxWidth="md">
                    <Grid container>
                        <Grid item xs={12}>
                            <DataTable header={header} uri="/forms"/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default FormList;