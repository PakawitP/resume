import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import InstagramIcon from '@material-ui/icons/Instagram';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { firebaseConfig } from '../../service/config/FirebaseConfig';
import { useStyles } from '../../styles/MainStyles'
import firebase from 'firebase/app';

const sections = [
  // { title: 'ประวัติ', url: '#' },
  // { title: 'ผลงาน', url: '#' },
  // { title: 'ภาษาที่ใช้พัฒนา', url: '#' },
  // { title: 'Business', url: '#' },
  // { title: 'Politics', url: '#' },
  // { title: 'Opinion', url: '#' },
  // { title: 'Science', url: '#' },
  // { title: 'Health', url: '#' },
  // { title: 'Style', url: '#' },
  // { title: 'Travel', url: '#' },
];

export default function Blog() {

  const classes = useStyles();
  const db = firebaseConfig.firestore();
  const [intro, setIntro] = React.useState(null)
  const [address, setAddress] = React.useState(null)
  const [social, setSocial] = React.useState(null)
  const [work, setWork] = React.useState(null)
  const [program, setProgram] = React.useState(null)
  const [cert, setCert] = React.useState(null)
  const [visit, setVisit] = React.useState(null)

  React.useEffect(async () => {

    let user = localStorage.getItem('user_resume') || null
    if (!user) {
      await db.collection('blog').doc('VZncL8OpJ0SKbUuBPHGM').update({
        visitors: firebase.firestore.FieldValue.increment(1)
      });
      localStorage.setItem('user_resume', {user_role : 'guest'});
    } else {
      console.log("old visitor")
    }
  
    const blog = await db.collection('blog').get()
    blog.forEach((doc) => {
      if (doc.data().name === 'address') {
        setAddress(doc.data())
      } else if (doc.data().name === 'introduce') {
        setIntro(doc.data())
      }
      else if (doc.data().name === 'visitors') {
        setVisit(doc.data().visitors)
      }
    });


    const social = await db.collection('social').get()
    setSocial(social.docs.map((doc) => {
      if (doc.data().name == 'GitHub') {
        return { name: 'GitHub', icon: GitHubIcon, url: doc.data().url }
      } else if (doc.data().name == 'Email') {
        return { name: 'Email', icon: EmailIcon, url: doc.data().url }
      } else if (doc.data().name == 'Facebook') {
        return { name: 'Facebook', icon: FacebookIcon, url: doc.data().url }
      } else if (doc.data().name == 'Instagram') {
        return { name: 'Instagram', icon: InstagramIcon, url: doc.data().url }
      } else {
        return { name: doc.data().name, icon: PhoneInTalkIcon, url: '' }
      }
    }))


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

    const programmer = await db.collection('programmer').get()
    setProgram(programmer.docs.map((doc) => {
      return {
        title: doc.data().name,
        url: doc.data().url,
        icon: doc.data().img,
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
        <Header title="Dev For Lift By Pakawit" sections={sections} />
        <main>
          {intro && <MainFeaturedPost post={{
            title: intro.titel,
            description: intro.data,
            image: 'https://source.unsplash.com/random',
            imgText: 'main image description',
          }} />}
          <Typography variant="h6" >
            ผลงานที่ผ่านมา
          </Typography>
          <Divider className={classes.marginDivider} />
          {work && <Grid container spacing={4}>
            {work.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>}
          <Grid container spacing={5} className={classes.mainGrid}>
            {cert && <Main title="Certificated" posts={cert} />}
            {address && social && program && <Sidebar
              title="ที่อยู่ปัจจุบัน"
              description={address.data}
              archives={program}
              social={social}
            />}
          </Grid>
        </main>
      </Container>
      {visit && <Footer title={`จำนวนผู้เข้าชม ${visit}`} description="Created by Pakawit Pongsing" />}
    </React.Fragment>
  );
}