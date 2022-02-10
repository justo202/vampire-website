import {Container} from "@mui/material";
import React from "react";
import Jumbotron from "../components/JumbotronComponent";
import TeamEdit from "../components/TeamEdit";
import PublicationsEdit from "../components/PublicationsEdit";
import ProjectsEdit from "../components/ProjectsEdit";
import NewsEdit from "../components/NewsEdit";

const ContentManagementArea = () => {
  return (
    <>
      <Jumbotron title="Content Management Area" />
      <Container>
        <TeamEdit />
        <PublicationsEdit />
        <ProjectsEdit />
        <NewsEdit />
      </Container>
    </>
  )
}

export default ContentManagementArea;
