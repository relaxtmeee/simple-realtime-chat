import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";

const Loader = () => {

    return (
        <Container>
            <Grid container
                style={{'height': window.innerHeight - 50}}
                alignItems={'center'}
                justifyContent={'center'}   
            >
                <Grid>
                    <Box p={5} display={'flex'} flexDirection={'column'}>
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Loader;