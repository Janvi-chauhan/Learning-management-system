import { useState } from "react";
import CoursesHero from "./CoursesHero";
import CoursesGrid from "./CoursesGrid";
import CourseTabs from "./CourseTabs";

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <CoursesHero />
      <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <CoursesGrid activeTab={activeTab} />
    </>
  );
}
