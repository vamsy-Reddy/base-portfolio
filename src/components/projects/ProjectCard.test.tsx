import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/content/types";

const project: Project = {
  slug: "demo",
  title: "Demo Project",
  tagline: "A short hook.",
  role: "Frontend",
  period: "2024",
  featured: false,
  problem: "p",
  approach: "a",
  impact: "i",
  tech: ["React", "TypeScript", "Vite"],
  accent: "#6ee7ff",
};

describe("ProjectCard", () => {
  it("renders the project's title, tagline and tech", () => {
    render(<ProjectCard project={project} index={0} onOpen={() => {}} />);
    expect(
      screen.getByRole("button", { name: /open case study: demo project/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Demo Project")).toBeInTheDocument();
    expect(screen.getByText("A short hook.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("calls onOpen with the project when activated", async () => {
    const onOpen = vi.fn();
    const user = userEvent.setup();
    render(<ProjectCard project={project} index={0} onOpen={onOpen} />);
    await user.click(screen.getByRole("button"));
    expect(onOpen).toHaveBeenCalledWith(project);
  });
});
