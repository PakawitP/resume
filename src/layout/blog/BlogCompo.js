import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Footer from './Footer';
import { firebaseConfig } from '../../service/config/FirebaseConfig';
import { useStyles } from '../../styles/MainStyles'
import firebase from 'firebase/app';
import { SectionsNav } from '../../component/pageView/HeaderNav';


export default function BlogCompo() {

  const classes = useStyles();
  const db = firebaseConfig.firestore();
  const [intro, setIntro] = React.useState(null)
  const [work, setWork] = React.useState(null)
  const [cert, setCert] = React.useState(null)
  const [visit, setVisit] = React.useState(null)

  React.useEffect(async () => {

    let user = localStorage.getItem('user_resume') || null
    if (!user) {
      await db.collection('blog').doc('VZncL8OpJ0SKbUuBPHGM').update({
        visitors: firebase.firestore.FieldValue.increment(1)
      });
      localStorage.setItem('user_resume', { user_role: 'guest' });
    } else {
      console.log("old visitor")
    }

    const blog = await db.collection('blog').get()
    blog.forEach((doc) => {
      if (doc.data().name === 'introduce') {
        setIntro(doc.data())
      }
      else if (doc.data().name === 'visitors') {
        setVisit(doc.data().visitors)
      }
    });

    const working = await db.collection('workings').get()
    setWork(working.docs.map((doc) => {
      return {
        title: doc.data().name,
        date: doc.data().date,
        description: doc.data().description,
        image: doc.data().image,
        imageText: 'Image Text',
      }
    }))

    const cert = await db.collection('certificated').get()
    setCert(cert.docs.map((doc) => {
      return {
        id: doc.data().id,
        img: doc.data().img,
      }
    }))
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Dev For Lift By Pakawit" sections={SectionsNav} />
        <main>
          {/* {intro && <MainFeaturedPost post={{
            title: intro.titel,
            description: intro.data,
            image: 'https://source.unsplash.com/random',
            imgText: 'main image description',
          }} />} */}

          {/* <Grid container className={classes.mainGrid}>
            {cert && <Main title="ประสบการณ์เเละผลงานที่ผ่านมา" posts={cert} />}
          </Grid> */}

          <Typography variant="h6" className={classes.marginsubh}>
            ผลงานอื่น ๆ
          </Typography>
          <Divider className={classes.marginDivider} />
          {work && <Grid container spacing={4}>
            {work.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>}
        </main>
      </Container>
      {visit && <Footer title={`จำนวนกาารเข้าชม ${visit} ครั้ง`} description="Created by Pakawit Pongsing" />}
    </React.Fragment>
  );
}