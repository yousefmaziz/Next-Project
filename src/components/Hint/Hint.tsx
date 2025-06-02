
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function Hint() {
    const theme = createTheme({
    typography: {
        htmlFontSize: 10,
    },
    });
return (
    <>

    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",    
          textAlign: "center",
          justifyContent: "center", 
          height: "100vh",        
          gap: 2,
          bgcolor:"white"                  
}}
>

        <Typography
          variant="h4" 
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            mb: 2,
            transition: "0.3s",
            '&:hover': {
              color: "secondary.main",
              transform: "scale(1.05)",
            },
            '@media (max-width:600px)': {
              fontSize: "1.5rem",
            },
          }}
        >
          GO TO LOGIN
        </Typography>
          <CircularProgress size={100} color="warning" />
      </Box>
    </ThemeProvider>


    </>
  )
}

