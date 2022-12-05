import { NextPage } from "next";
import { useSession, getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { selectCurrentUser, setCurrentUser } from "slices/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AppLayout from "@/components/appLayout";
import styled from "styled-components";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaMap } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import LocationInput from "@/components/LocationInput";
import FeedsList from "@/components/FeedsList";
import FeedsMap from "@/components/FeedsMap";

const Section = styled.div`
  // height: auto;
  // padding: 0 3rem;
  padding: 1rem;
  padding-left: 0.2rem;
  height: 100vh;
  // width: 100%;
  // background-color: red;
  // border: 1px solid #d2d7e4;
  // margin-right: 0.6rem;
`;

const FeedsSectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  // background-color: red;
  padding: 1rem 0rem;
`;
const FeedsInputAndProfile = styled.div`
  // background-color: teal;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FeedsGridAndListToggle = styled.div`
  display: flex;
  align-items: center;
  // background-color: teal;
`;

const RequestInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  & > p {
    margin-bottom: 0.5rem;
  }
`;

const RequestInput = styled.textarea`
  width: 250px;
  height: 100px;

  padding: 0.5rem 1rem;
  outline: none;
  border: 1px solid transparent;
  background-color: #fbf9f6;

  border-radius: 5px;
  transition: all 0.4s ease;
  font-family: "Ubuntu", sans-serif;
  color: grey;

  resize: none;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #d2d7e4;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;

  &:focus {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:placeholder {
    color: #d2d7e4;
    padding: 1rem;
  }
`;

const Feeds: NextPage = (): JSX.Element => {
  const [view, setView] = useState<string | null>("map");

  const handleView = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    setView(newView);
  };

  console.log(view);

  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  // const { redirect } = router.query; //login?redirect=/shipping
  // console.log(redirect);

  // console.log(session);

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

  return (
    <AppLayout
      description="OnPeeps is a social media platform that enables users render exchanged acts of kindness."
      name="Feed / OnPeeps"
    >
      <Section>
        <FeedsSectionHeader>
          <FeedsInputAndProfile>
            <Avatar
              alt="Remy Sharp"
              src="/images/profilepics.jpg"
              sx={{ width: 56, height: 56 }}
            />

            <RequestInputWrapper>
              <p>Hi, Femi</p>

              <form style={{ display: "flex", alignItems: "flex-start" }}>
                <RequestInput
                  placeholder="What do you need help with?"
                  // rows={3}
                  // cols={50}
                  onFocus={(e) => {
                    // e.target.placeholder = "";
                    e.target.style.width = "300px";
                  }}
                  onBlur={(e) => {
                    e.target.placeholder = "What do you need help with?";
                    e.target.style.width = "250px";
                  }}
                />

                <LocationInput />
              </form>
            </RequestInputWrapper>
          </FeedsInputAndProfile>

          <FeedsGridAndListToggle>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleView}
              aria-label="view toggle"
            >
              {/* <Tooltip title="Map View"> */}
              <ToggleButton value="map" aria-label="map view">
                <FaMap style={{ fontSize: "1.5rem" }} />
              </ToggleButton>
              {/* </Tooltip> */}
              {/* <Tooltip title="List View"> */}
              <ToggleButton value="list" aria-label="list view">
                <AiOutlineUnorderedList style={{ fontSize: "1.5rem" }} />
              </ToggleButton>
              {/* </Tooltip> */}
            </ToggleButtonGroup>
          </FeedsGridAndListToggle>
        </FeedsSectionHeader>

        {view === "list" ? <FeedsList /> : <FeedsMap />}
      </Section>
    </AppLayout>
  );
};

export default Feeds;
