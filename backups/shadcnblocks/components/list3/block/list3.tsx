import React from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const experiences = [
  {
    year: "2019 - PRESENT",
    role: "SENIOR SOFTWARE ENGINEER",
    company: "TECHNOLOGY INNOVATIONS CORP",
  },
  {
    year: "2018 - 2020",
    role: "FULL-STACK DEVELOPER",
    company: "DIGITAL SOLUTIONS & STARTUP COLLABORATIONS",
  },
  {
    year: "2017 - 2018",
    role: "FRONTEND DEVELOPER",
    company: "WEB CRAFT STUDIO",
  },
  {
    year: "2015 - 2016",
    role: "JUNIOR DEVELOPER",
    company: "CODE FORGE LABS",
  },
  {
    year: "2014 - 2015",
    role: "INTERN DEVELOPER",
    company: "INNOVATION TECH",
  },
];

const awards = [
  {
    year: "2015",
    title: "BEST NEWCOMER DEVELOPER",
    organization: "TECH EXCELLENCE AWARDS",
  },
  {
    year: "2015",
    title: "INNOVATION IN WEB DEVELOPMENT",
    organization: "DIGITAL CREATORS UK",
  },
  {
    year: "2016",
    title: "OUTSTANDING CODE QUALITY",
    organization: "BRITISH SOFTWARE ASSOCIATION",
  },
  {
    year: "2017",
    title: "RISING STAR IN TECH",
    organization: "GLOBAL DEVELOPER AWARDS",
  },
  {
    year: "2018",
    title: "DEVELOPER OF THE YEAR",
    organization: "CODE EXCELLENCE AWARDS",
  },
  {
    year: "2019",
    title: "BEST TECH TEAM LEADER",
    organization: "UK SOFTWARE GUILD",
  },
  {
    year: "2020",
    title: "INNOVATION IN SOFTWARE ARCHITECTURE",
    organization: "DIGITAL INNOVATION AWARDS",
  },
  {
    year: "2021",
    title: "EMERGING TECH LEADER",
    organization: "LONDON TECH COUNCIL",
  },
  {
    year: "2022",
    title: "EXCELLENCE IN FULL-STACK DEVELOPMENT",
    organization: "DEVELOPER WEEKLY",
  },
  {
    year: "2023",
    title: "BEST SOFTWARE ENGINEER",
    organization: "EUROPEAN TECH & MEDIA",
  },
];

interface List3Props {
  className?: string;
}

const List3 = ({ className }: List3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <span className="text-sm text-muted-foreground">/ CAREER PATH</span>
            <h1 className="text-4xl md:text-6xl">
              BUILDING SOLUTIONS,
              <br /> SHAPING THE FUTURE
            </h1>
          </div>
          <div className="flex flex-col gap-7">
            <h2 className="text-xl">/ EXPERIENCE</h2>
            <div>
              {experiences.map((experience, idx) => (
                <React.Fragment key={idx}>
                  <Separator />
                  <div className="my-2.5 grid gap-2.5 text-sm sm:grid-cols-3">
                    <p className="text-muted-foreground">{experience.year}</p>
                    <p>{experience.role}</p>
                    <p className="text-muted-foreground">
                      {experience.company}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <h2 className="text-xl">/ ACHIEVEMENTS</h2>
            <div>
              {awards.map((award, idx) => (
                <React.Fragment key={idx}>
                  <Separator />
                  <div className="my-2.5 grid gap-2.5 text-sm sm:grid-cols-3">
                    <p className="text-muted-foreground">{award.year}</p>
                    <p>{award.title}</p>
                    <p className="text-muted-foreground">
                      {award.organization}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { List3 };
