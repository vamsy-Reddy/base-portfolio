import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import MarqueeBand from "@/components/ui/MarqueeBand";

// Brand technologies only, so every item carries its official logo.
const marqueeItems = [
  "React",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "Redux",
  "Tailwind CSS",
  "Three.js",
  "Node.js",
  "GraphQL",
  "Docker",
  "Git",
  "Vite",
  "Jest",
  "MongoDB",
  "Sass",
  "Ant Design",
];

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <MarqueeBand items={marqueeItems} />
      <About />
      <Journey />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
