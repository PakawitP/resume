import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Slide } from "react-slideshow-image";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import 'react-slideshow-image/dist/styles.css'
import { useStyles } from '../../styles/MainStyles'

// const useStyles = makeStyles((theme) => ({
//   markdown: {
//     ...theme.typography.body2,
//     padding: theme.spacing(3, 0),
//   },
//   img:{
//     height:'auto',
//     width:'85%',
//   },
//   alignimg:{
//     textAlign: "center",
//   }
// }));


export default function Main(props) {
  const classes = useStyles();
  const { posts, title } = props;
  console.log(posts)
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider className={classes.marginDivider} />
      <Slide easing="ease" autoplay={true} duration={7000}>
        {posts.map((post) => (
          <div className="each-slide" key={post.id}>
            <div className={classes.alignimg}>
              <img className={classes.img} src={post.img} alt={post.id} />
            </div>
          </div>
        ))}
      </Slide>


    </Grid >
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};