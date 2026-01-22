import { useState } from "react";
import axios from "axios";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file); // must match backend

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Upload successful!");
      console.log("Cloudinary URL:", res.data.url);
    } catch (err) {
      setMessage("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadResume;
