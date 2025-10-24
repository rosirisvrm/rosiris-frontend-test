import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store';
import { AppRoutes } from '@/routes/AppRoutes';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;