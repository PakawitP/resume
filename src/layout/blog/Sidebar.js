import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { archives, description, social, title } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid item className={classes.sidebarAboutBox}>
            <LocationOnIcon />
          </Grid>
        </Grid>
        <Typography>{description}</Typography>
      </Paper>
      <Grid container direction="row" spacing={1} alignItems="center">
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
            ภาษาเเละเครื่องมือที่ใช้
          </Typography>
        </Grid>
        <Grid item className={classes.sidebarSection}>
          <DeveloperBoardIcon />
        </Grid>
      </Grid><Grid container direction="row" spacing={1} alignItems="center">
        {archives.map((archive) => (
          <Grid item>
            <Link display="block" variant="body1" href={archive.url} key={archive.title}>
              <img src={archive.icon} alt={archive.name} />
            </Link>
          </Grid>

        ))}</Grid>
      <Grid container direction="row" spacing={1} alignItems="center">
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
            ติดต่อ
          </Typography>
        </Grid>
        <Grid item className={classes.sidebarSection}>
          <ContactMailIcon />
        </Grid>
      </Grid>
      {
        social.map((network) => (
          <Link display="block" variant="body1" href={network.url || "#"} key={network}>
            <Grid container direction="row" spacing={1} alignItems="center">
              <Grid item>
                <network.icon />
              </Grid>
              <Grid item>{network.name}</Grid>
            </Grid>
          </Link>
        ))
      }
    </Grid >
  );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};