import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetup() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetup) {
    const resopnse = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetup),
      headers: { "Content-Type": "application/json" },
    });

    const data = await resopnse.json();
    console.log(data);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add a new meetup to setup clan meetings at locations around Lothric."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetup;
