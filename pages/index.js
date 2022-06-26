import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://VaibhavDubey:Matpet1234!@cluster0.xxjllg5.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetups) => {
        return {
          id: meetups._id.toString(),
          title: meetups.title,
          address: meetups.address,
          description: meetups.description,
          image: meetups.image,
        };
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
