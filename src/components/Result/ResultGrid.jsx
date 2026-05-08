import ResultCard from "./ResultCard";

const resultsData = [
  {
    name: "Aman Kumar",
    company: "Infosys",
    designation: "React JS Developer",
    batch: "Full Stack - 2023",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
  },
  {
    name: "Priya Sharma",
    company: "Google",
    designation: "Data Analyst",
    batch: "Data Science - 2023",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Rahul Verma",
    company: "Meta",
    designation: "Web Developer",
    batch: "Full Stack - 2022",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "Nisha Singh",
    company: "Amazon",
    designation: "Python Developer",
    batch: "DSA - 2022",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Amit Raj",
    company: "Microsoft",
    designation: "Frontend Developer",
    batch: "React",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Sneha Kumari",
    company: "Apple",
    designation: "UI Developer",
    batch: "Frontend",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Vikas Kumar",
    company: "TCS",
    designation: "Backend Engineer",
    batch: "Java Backend",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/TCS_Logo.svg",
  },
  {
    name: "Neeraj Singh",
    company: "Wipro",
    designation: "Full Stack Dev",
    batch: "MERN",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Wipro_Primary_Logo_Color_RGB.svg",
  },
  {
    name: "Riya Das",
    company: "Accenture",
    designation: "Software Engineer",
    batch: "DSA",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Accenture.svg",
  },
];

export default function ResultGrid() {
  return (
    <div className="
        max-w-[1200px] mx-auto
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-4
        gap-x-[5px]
        gap-y-[20px]
    ">


      {resultsData.map((item, index) => (
        <ResultCard key={index} data={item} />
      ))}
    </div>
  );
}

