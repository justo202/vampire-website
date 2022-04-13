import React from "react";
import Jumbotron from "../components/JumbotronComponent";
import { Grid } from "@mui/material";
import ResearchSection from "../components/researchComponent";

const Research = () => {
  const researchList = [
    {
      photo: "https://picsum.photos/400",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum",
      title: "A research title that can be a bit longer than normal titles",
      pointers: [
        {
          title: "Test pointer to w3schools!",
          link: "https://www.w3schools.com/",
        },
        {
          title: "Another pointer to another place",
          link: "https://www.google.com/",
        },
      ],
      collaborators: [
        "Person",
        "Another person",
        "Third person",
        "Fourth person",
      ],
      timeframe: ["2021", "2022"],
      funding: "Colaborator",
      key: 1,
    },
    {
      photo: "https://picsum.photos/400",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      title: "2",
      key: 2,
    },
    {
      photo: "https://picsum.photos/400",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum",
      title: "3",
      key: 3,
    },
    {
      photo: "https://picsum.photos/400",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum",
      title: "4",
      key: 4,
    },
    {
      photo: "https://picsum.photos/400",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum",
      title: "5",
      key: 5,
    },
    {
      photo: "https://picsum.photos/400",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum",
      title: "6",
      key: 6,
    },
  ];
  var left = true;
  const researchListMap = researchList.map((item) => {
    left = !left;
    return (
      <ResearchSection
        imageLeft={left}
        description={item.description}
        title={item.title}
        photo={item.photo}
        pointers={item.pointers}
        collaborators={item.collaborators}
        timeframe={item.timeframe}
        funding={item.funding}
      />
    );
  });

  return (
    <>
      <Jumbotron
        title={"Research"}
        subtitle={"Research projects done in VAMPIRE"}
      />
      <Grid
        container
        alignItems={"center"}
        mr={"auto"}
        ml={"auto"}
        mt={1}
        direction={"column"}
        rowGap={1}
        maxWidth={"1100px"}
      >
        {researchListMap}
      </Grid>
    </>
  );
};

export default Research;
