import {Grid} from "@mui/material";
import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";
import ResearchSection from "../components/researchComponent";
import db from "../firebase";
import {createInstance} from "../utils";
const Research = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function getData() {
      const snapshot = await getDocs(collection(db, "projects"));
      setProjects(
        snapshot.docs.map((doc, idx) => {
          const temp = createInstance("projects", doc.data());
          temp.id = doc.id;
          let values = {};
          temp.getAttributes().forEach((item) => {
            values[item.name] = item.value;
          });
          return {...doc.data(), id: doc.id};
        })
      );
      setLoading(false);
    }
    getData();
  }, []);

  var left = true;

  const researchListMap = projects.map((item) => {
    left = !left;
    return <ResearchSection key={item.id} imageLeft={left} {...item} />;
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
        mt={4}
        mb={4}
        direction={"column"}
        rowGap={4}
        maxWidth={"1100px"}
      >
        {researchListMap}

      </Grid>
    </>
  );
};

export default Research;
