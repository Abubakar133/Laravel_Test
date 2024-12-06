import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import NavBar from "./navbar";
const Upload = () => {
    const { data, setData, post, errors } = useForm({
        file: null,
    });

    const [processing, setProcessing] = useState(false);
    const [fileId, setFileId] = useState(null);
    const [intervelvalue, setintervel] = useState(5000);

    const handleFileChange = (e) => {
        setData("file", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setProcessing(true);

        post("/upload", {
            forceFormData: true,
            onSuccess: (response) => {
                setProcessing(false);

                const newFileId = response.props.flash?.file_id;
                setFileId(newFileId);

                toast.success(
                    response.props.flash?.message ||
                        "File uploaded successfully!"
                );
            },
            onError: () => {
                setProcessing(false);
                toast.error("Failed to upload file. Please try again.");
            },
        });
    };

    useEffect(() => {
        let interval;

        if (fileId) {
            interval = setInterval(() => {
                fetch(`/file-status/${fileId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.upload_status === "Completed") {
                            toast.success("File uploaded and Ready to use!");
                            clearInterval(interval);
                        } else if (data.upload_status === "Failed") {
                            toast.error("File processing failed.");
                            clearInterval(interval);
                        } else if (data.upload_status === "Processing") {
                            setintervel(10000);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching file status:", error);
                        toast.error("Error fetching file status.");
                        clearInterval(interval);
                    });
            }, intervelvalue);
        }

        return () => clearInterval(interval);
    }, [fileId, intervelvalue]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => setData("file", acceptedFiles[0]),
        multiple: false,
        accept: ".pdf,.docx,.png,.jpg,.jpeg,.zip",
    });

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-r from-blue-200 to-teal-500 flex justify-center items-center">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
                    <h1 className="text-[50px] font-semibold text-center text-gray-800 mb-8">
                        Upload Your File
                    </h1>

                    <div
                        {...getRootProps()}
                        className="border-4 border-dashed border-blue-500 p-10 text-center rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200"
                    >
                        <input {...getInputProps()} />
                        <p className="text-lg text-red-500">
                            Drag & Drop your file here or click to select
                        </p>
                    </div>

                    {data.file && (
                        <div className="mt-4 text-center">
                            <span className="font-medium">Selected File: </span>
                            <span className="text-blue-600">
                                {data.file.name}
                            </span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {errors.file && (
                            <p className="text-red-500 text-sm">
                                {errors.file}
                            </p>
                        )}

                        <button
                            type="submit"
                            className={`w-full py-3 text-white rounded-md ${
                                processing
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-teal-500 hover:bg-teal-600"
                            } transition duration-200`}
                            disabled={processing}
                        >
                            {processing ? "Uploading..." : "Upload"}
                        </button>
                    </form>

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Upload;
