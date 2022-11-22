import { NextPage } from "next";
import { useSession, getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Feeds: NextPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  // const { redirect } = router.query; //login?redirect=/shipping
  // console.log(redirect);

  console.log(session);

  // router.push(redirect || "/");

  useEffect(() => {
    // a function that returns single user after signup is completed
    const getUser = async () => {
      if (session) {
        const { data } = await axios.post("/api/v1/users/get-single-user", {
          email: session?.user?.email,
        });
        console.log(data);
        dispatch(setCurrentUser({ user: data.data }));
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [status]);

  return <div>Feeds Page</div>;
};

export default Feeds;
