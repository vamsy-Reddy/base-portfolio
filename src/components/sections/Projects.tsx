"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import { content } from "@/content/content";
import { messages } from "@/i18n";
import type { Project } from "@/content/types";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      eyebrow={messages.projects.eyebrow}
      title={messages.projects.title}
      intro={messages.projects.intro}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {content.projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={i * 0.06}
            className={project.featured ? "md:col-span-2" : ""}
          >
            <ProjectCard project={project} index={i} onOpen={setSelected} />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectCaseStudy
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
