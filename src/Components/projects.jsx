import "../App.css";

const projectData = [
  {
    title: "Project 1",
    description: "A cool project that looks like a mini webpage!",
    url: "https://project1.com"
  },
  {
    title: "Project 2",
    description: "Another amazing project with great features!",
    url: "https://project2.com"
  },
  {
    title: "Project 3",
    description: "An innovative solution for modern problems",
    url: "https://project3.com"
  },
  {
    title: "Project 4",
    description: "Pushing the boundaries of web development",
    url: "https://project4.com"
  },
  {
    title: "Project 5",
    description: "Creating seamless user experiences",
    url: "https://project5.com"
  },
  {
    title: "Project 6",
    description: "Revolutionary tech solutions",
    url: "https://project6.com"
  }
];

function Projects(props) {
  const handleProjectClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="projects-div">
      <h1 className="projects-heading">Projects</h1>
      <div className="project-grid">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => handleProjectClick(project.url)}
            onPointerEnter={() => props.onPointerEnter("cursor-project")}
            onPointerLeave={props.onPointerLeave}
          >
            <div className="top-bar">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects