import React from "react";
import PT from "prop-types";
import { StoryGrid } from "../../story-grid";
const AuthorPage = props => {
  const stories = props.data.stories.map(({ story }) => story) || props.data.stories;
  return (
    <React.Fragment>
      <h1>{`Author - ${props.data.author.name}`}</h1>
      <StoryGrid stories={stories} />
    </React.Fragment>
  );
};

AuthorPage.propTypes = {
  data: PT.shape({
    author: PT.object,
    stories: PT.array
  })
};

export { AuthorPage };
