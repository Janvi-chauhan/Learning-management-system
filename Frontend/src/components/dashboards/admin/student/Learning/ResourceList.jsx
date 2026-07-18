import {
  FileText,
  FileArchive,
  FileCode,
  Download,
  ExternalLink,
} from "lucide-react";
import api from "../../../../../services/api";

export default function ResourceList({ resources = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-500" size={22} />;

      case "zip":
        return <FileArchive className="text-yellow-500" size={22} />;

      case "code":
        return <FileCode className="text-green-600" size={22} />;

      default:
        return <FileText className="text-gray-500" size={22} />;
    }
  };

  if (resources.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <FileText
          size={45}
          className="mx-auto text-gray-400 mb-4"
        />

        <h3 className="text-xl font-semibold text-gray-700">
          No Resources Available
        </h3>

        <p className="text-gray-500 mt-2">
          Resources for this lesson will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md">

      {/* Header */}

      <div className="border-b px-6 py-5">

        <h2 className="text-2xl font-bold">
          Learning Resources
        </h2>

        <p className="text-gray-500 mt-1">
          Download notes, source code and additional materials.
        </p>

      </div>

      {/* Resource List */}

      <div className="divide-y">

        {resources.map((resource) => (

          <div
            key={resource.id}
            className="flex justify-between items-center p-6 hover:bg-gray-50 transition"
          >

            {/* Left */}

            <div className="flex items-center gap-4">

              <div className="bg-gray-100 p-3 rounded-lg">

                {getIcon(resource.type)}

              </div>

              <div>

                <h3 className="font-semibold text-gray-800">

                  {resource.title}

                </h3>

                <p className="text-sm text-gray-500 mt-1">

                  {resource.description}

                </p>

                <span className="text-xs text-gray-400">

                  {resource.size}

                </span>

              </div>

            </div>

            {/* Right */}

            <div className="flex gap-3">

             {resource.preview && (
  <a
    href={resource.file}
    target="_blank"
    rel="noreferrer"
    className="border px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
  >
    <ExternalLink size={18} />

    Preview
  </a>
)}

              <a
    href={resource.file}
    target="_blank"
    rel="noreferrer"
    onClick={async () => {

        try{

            await api.post(

                `/resources/${resource.id}/download`

            );

        }catch(err){

            console.log(err);

        }

    }}
>
    Download
</a>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}