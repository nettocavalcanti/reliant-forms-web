import React from "react";

import { Container, Grid, Box, Button } from "@material-ui/core";

const Footer = () => {

  return (
    <footer>
      <Box bgcolor="text.secondary" color="white">
          <Container maxWidth="md">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <Box borderBottom={1}>Help</Box>
                    <Box>
                        <Button color="inherit">Home</Button>
                    </Box>
                </Grid>
            </Grid>
          </Container>
      </Box>
    </footer>
  )
}

export default Footer;