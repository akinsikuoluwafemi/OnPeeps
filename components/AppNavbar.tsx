import Link from "next/link";
import React from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdOutlineMessage, MdMessage } from "react-icons/md";
import { FiGitPullRequest } from "react-icons/fi";
import {
  IoGitPullRequestOutline,
  IoGitPullRequestSharp,
  IoCallSharp,
  IoCallOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useSession, getSession, signOut } from "next-auth/react";
import Avatar from "@mui/material/Avatar";

import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { selectCurrentUser } from "slices/currentUserSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";

const AppNavbarContainer = styled.div`
  //   background: teal;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;

  @media (max-width: 768px) {
    padding-left: 0.5rem;
  }

  ul {
    position: relative;
  }

  li {
    margin-bottom: 0.6rem;
    position: relative;

    & > .logout {
      //   background: teal;
      //   margin-top: 5rem;
    }

    & > .list-link {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1.2rem;
      gap: 1rem;
      cursor: pointer;
      padding: 0.7rem 1rem;
      color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};

      @media (max-width: 768px) {
        span {
          display: none;
        }
      }
    }

    &:hover {
      border-radius: 10px;
      width: 100%;
      background-color: #d2d7e4;
    }

    &:last-of-type {
      //   background-color: red;

      @media (max-width: 768px) {
        // margin-left: -0.4rem;
      }

      .list-link {
        // padding: 0.7rem 0rem;
        // background-color: red;
        gap: 1rem;

        margin: auto;
        transition: all 0.2s ease-in-out;

        & > .bold {
          font-weight: 600;
        }

        @media (max-width: 768px) {
          //   padding-left: 0.5rem;
        }
      }
    }
  }
`;

const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 1rem;
  //   text-transform: capitalize;
  //   background-color: red;
  //   margin-top: auto;

  & > span:first-of-type {
    font-weight: 600;
  }

  & > span:last-of-type {
  }
`;

const AppNavbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  //   console.log(currentUser);

  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "http://localhost:3000/",
    });
    console.log(data);
    // router.replace(data.url);
  };
  return (
    <AppNavbarContainer>
      <Link href="/">
        <img
          style={{
            height: "30px",
            width: "30px",
            marginLeft: "1rem",
            marginBottom: "2rem",
          }}
          src="../../images/cover.png"
        />
      </Link>

      <ul>
        <li>
          <Link href="/" className="list-link">
            {/* <AiFillHome style={{ fontSize: "1.5rem" }} /> */}

            <AiOutlineHome style={{ fontSize: "1.5rem" }} />

            <Tooltip title="Home">
              <span>Home</span>
            </Tooltip>
          </Link>
        </li>

        <li>
          <Link href="/messages" className="list-link">
            <MdOutlineMessage style={{ fontSize: "1.5rem" }} />
            <Tooltip title="messages">
              <span>Messages</span>
            </Tooltip>
          </Link>
        </li>

        <li>
          <Link href="/call-logs" className="list-link">
            <IoCallOutline style={{ fontSize: "1.5rem" }} />

            <Tooltip title="Call logs">
              <span>Call Logs</span>
            </Tooltip>
          </Link>
        </li>

        <li>
          <Link href="/request" className="list-link">
            <IoGitPullRequestOutline style={{ fontSize: "1.5rem" }} />
            <Tooltip title="request">
              <span>Request</span>
            </Tooltip>
          </Link>
        </li>

        <li>
          <Link href="/notifications" className="list-link">
            <IoIosNotificationsOutline style={{ fontSize: "1.5rem" }} />
            <Tooltip title="Notifications">
              <span>Notifications</span>
            </Tooltip>
          </Link>
        </li>
        <li>
          <Link href="/account-info" className="list-link">
            <BsInfoCircle style={{ fontSize: "1.5rem" }} />
            <Tooltip title="Account Info">
              <span>Account Info</span>
            </Tooltip>
          </Link>
        </li>

        <li className="logout" onClick={handleSignOut}>
          <span className="list-link logout">
            <IoLogOutOutline style={{ fontSize: "1.5rem" }} />
            <Tooltip title="logout">
              <span>Logout</span>
            </Tooltip>
          </span>
        </li>

        <li className="">
          <span className="list-link">
            <CgProfile style={{ fontSize: "1.8rem" }} />
            <span className="bold">
              @{currentUser?.username?.substring(0, 7)}{" "}
              {currentUser?.username &&
                currentUser?.username?.length > 7 &&
                "..."}
            </span>

            {/* <Avatar
              alt="Remy Sharp"
              src="/images/profilepics.jpg"
              sx={{ width: 40, height: 40 }}
            /> */}
            {/* <ProfileName className="profile-name">
              <span className="bold">{currentUser?.email}</span>
              <span className="no-bold">@{currentUser?.username}</span>
            </ProfileName> */}
            {/* <Tooltip title="">
              <span>{currentUser?.username?.toUpperCase()}</span>
            </Tooltip> */}
          </span>
        </li>
      </ul>
    </AppNavbarContainer>
  );
};

export default AppNavbar;
