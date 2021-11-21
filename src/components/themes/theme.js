import {createTheme} from '@material-ui/core/styles';
import colors from './skyBlue';

const white = '#FFFFFF';
const black = '#000000';

const theme = createTheme({
    black,
    white,
    palette: {
        primary: {
            main: colors.primary,
            dark: colors.primaryDark,
            light: colors.primaryLight
        },
        secondary: {
            main: colors.secondary,
            dark: colors.secondaryDark,
            light: colors.secondaryLight
        },
        inherit: {
            main: colors.inherit
        },
        default: {
            main: colors.default
        }
    }
});

export default theme;