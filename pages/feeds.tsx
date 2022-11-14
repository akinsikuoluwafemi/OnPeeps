import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";

const Feeds: NextPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUser({ user: {} }));
    // console.log("changing user to empty");
  }, [session]);
  console.log(session?.user);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [status]);

  if (status === "authenticated") {
    console.log(session);
    console.log(status);
  }
  return <div>Loading</div>;
};

export default Feeds;
