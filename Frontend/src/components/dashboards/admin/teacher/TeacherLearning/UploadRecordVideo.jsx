import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../../services/api";


export default function UploadRecordedVideo() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modules,setModules]=useState([]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!video) {
    alert("Please select a video.");
    return;
  }

  setLoading(true);

  try {
   const formData = new FormData();

formData.append("module_id", moduleId);
formData.append("title", title);
formData.append("duration", duration);
formData.append("description", description);
formData.append("video", video);

    await api.post(
    `/teacher/courses/${courseId}/upload-video`,
    formData,
    {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
);

    alert("Video uploaded successfully.");

    navigate(`/teacher/course/${courseId}`);

  } catch (err) {
    console.log(err);

    console.log(err.response);

    console.log(err.response?.data);

    alert("Upload failed");
}
finally {
  setLoading(false);
}
};
const fetchModules=async()=>{

const res=await api.get(
`/teacher/courses/${courseId}`
);

setModules(res.data.data.modules);

};
useEffect(()=>{

fetchModules();

},[]);
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Upload Recorded Session
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <select
value={moduleId}
onChange={(e)=>setModuleId(e.target.value)}
className="w-full border p-3 rounded"
>

<option value="">Select Module</option>

{
modules.map(module=>(
<option
key={module.id}
value={module.id}
>
{module.title}
</option>
))
}

</select>

        <input
          type="text"
          placeholder="Lesson Title"
          className="w-full border p-3 rounded"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Duration"
          className="w-full border p-3 rounded"
          value={duration}
          onChange={(e)=>setDuration(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e)=>setVideo(e.target.files[0])}
        />

       <button
  type="submit"
  disabled={loading}
  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg disabled:opacity-50"
>
  {loading ? "Uploading..." : "Upload Video"}
</button>

      </form>

    </div>
  );
}