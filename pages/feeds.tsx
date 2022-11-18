import { NextPage } from "next";
import { useSession, getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";

const Feeds: NextPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(router);
  const dispatch = useDispatch();

  //   const { redirect } = router.query; //login?redirect=/shipping
  //   console.log(redirect);

  // router.push(redirect || "/");

  useEffect(() => {
    dispatch(setCurrentUser({ user: {} }));
    // console.log("changing user to empty");
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [status]);

  //   useEffect(() => {
  //     const securePage = async () => {
  //       const session = await getSession();
  //       if (!session) {
  //         signIn();
  //       } else {
  //         console.log(session);
  //         setLoading(false);
  //       }
  //     };
  //     securePage();
  //   }, []);

  return <div>Feeds Page</div>;
};

export default Feeds;
