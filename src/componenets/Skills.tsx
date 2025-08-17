import {
  BiLogoCss3,
  BiLogoHtml5,
  BiLogoJavascript,
  BiLogoNodejs,
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
  BiLogoGit,
  BiLogoGithub,
} from "react-icons/bi";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiJest,
  SiPostman,
  SiFigma,
  SiAdobephotoshop,
  SiCanva,
  SiLinux,
  SiRedux,
  SiGraphql,
  SiPrisma,
} from "react-icons/si";

export default function SkillsSection() {
  const developmentSkills = [
    { icon: <BiLogoHtml5 className="text-5xl" />, name: "HTML" },
    { icon: <BiLogoCss3 className="text-5xl" />, name: "CSS" },
    { icon: <BiLogoTailwindCss className="text-5xl" />, name: "TailwindCSS" },
    { icon: <BiLogoJavascript className="text-5xl" />, name: "JavaScript" },
    { icon: <BiLogoTypescript className="text-5xl" />, name: "TypeScript" },
    { icon: <BiLogoReact className="text-5xl" />, name: "React" },
    { icon: <SiNextdotjs className="text-5xl" />, name: "Next.js" },
    { icon: <SiRedux className="text-5xl" />, name: "Redux" },
    { icon: <BiLogoNodejs className="text-5xl" />, name: "Node.js" },
    { icon: <SiExpress className="text-5xl" />, name: "Express.js" },
    { icon: <SiMongodb className="text-5xl" />, name: "MongoDB" },
    { icon: <SiPostgresql className="text-5xl" />, name: "PostgreSQL" },
    { icon: <SiMysql className="text-5xl" />, name: "MySQL" },
    { icon: <SiFirebase className="text-5xl" />, name: "Firebase" },
    { icon: <SiGraphql className="text-5xl" />, name: "GraphQL" },
    { icon: <SiPrisma className="text-5xl" />, name: "Prisma ORM" },
  ];

  const developmentTools = [
    { icon: <BiLogoGit className="text-5xl" />, name: "Git" },
    { icon: <BiLogoGithub className="text-5xl" />, name: "GitHub" },
    { icon: <SiDocker className="text-5xl" />, name: "Docker" },
    { icon: <SiJest className="text-5xl" />, name: "Jest" },
    { icon: <SiPostman className="text-5xl" />, name: "Postman" },
    { icon: <SiLinux className="text-5xl" />, name: "Linux" },
  ];

  const designTools = [
    { icon: <SiFigma className="text-5xl" />, name: "Figma" },
    {
      icon: <SiAdobephotoshop className="text-5xl" />,
      name: "Adobe Photoshop",
    },
    { icon: <SiCanva className="text-5xl" />, name: "Canva" },
  ];

  const renderSection = (
    title: string,
    items: { icon: JSX.Element; name: string }[]
  ) => (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-center mb-5">{title}</h2>
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded px-5 py-3 flex gap-3 flex-col items-center bg-[#332d43] text-white hover:scale-110 transition-transform duration-300"
          >
            {item.icon}
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mb-50">
      <h1 className="text-3xl font-bold text-center mb-8">My Skills & Tools</h1>
      {renderSection("Development Skills", developmentSkills)}
      {renderSection("Development Tools", developmentTools)}
      {renderSection("Design Tools", designTools)}
    </div>
  );
}
