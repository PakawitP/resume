import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    marginDivider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    img: {
        height: 'auto',
        width: '85%',
    },
    alignimg: {
        textAlign: "center",
    }
}));