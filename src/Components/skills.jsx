import React from "react";

const skills = [
  { skill: "JavaScript", color: "#F7DF1E" },
  { skill: "React", color: "#61DAFB" },
  { skill: "Node.js", color: "#68A063" },
  { skill: "Python", color: "#306998" },
  { skill: "Java", color: "#ED8B00" },
  { skill: "C++", color: "#00599C" },
  { skill: "SQL", color: "#00758F" },
  { skill: "Git", color: "#F05032" },
];

const Slider = () => {
  return (
    <div>
      <div
        className="slider"
        style={{
          "--width": "100px",
          "--height": "50px",
          "--quantity": skills.length,
          transform: "skewY(5deg)",
        }}
      >
        <div className="list">
          {skills.map((item, index) => (
            <div
              key={index}
              className="item"
              style={{
                "--position": index + 1, // Use color from JSON data
                color: item.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: "skewY(-5deg)",
              }}
            >
              {item.skill} {/* Skill name from JSON */}
            </div>
          ))}
        </div>
      </div>

      <div
        className="slider"
        reverse="true"
        style={{
          "--width": "100px",
          "--height": "50px",
          "--quantity": skills.length,
          transform: "skewY(-5deg)",
        }}
      >
        <div className="list">
          {skills.map((item, index) => (
            <div
              key={index}
              className="item"
              style={{
                "--position": index + 1, // Use color from JSON data
                color: item.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: "skewY(5deg)",
              }}
            >
              {item.skill} {/* Skill name from JSON */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
