import React, { useState, useEffect } from "react";
import NavBar from "./navbar";
const FileTable = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch("/history2");
                if (!response.ok) {
                    throw new Error("Failed to fetch files");
                }
                const data = await response.json();
                setFiles(data.files);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    if (loading)
        return <div className="text-center text-gray-500">Loading...</div>;
    if (error)
        return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div>
            {" "}
            <NavBar />
            <div className="container mx-auto p-4">
                <header className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        File Upload History
                    </h2>
                    <p className="text-sm text-gray-500">
                        View details of uploaded files and their status.
                    </p>
                </header>
                <div className="overflow-x-auto max-h-[520px] border border-gray-300">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600">
                                    #ID
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600">
                                    File Name
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600">
                                    Status
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600">
                                    Uploaded At
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600">
                                    Completed At
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.length > 0 ? (
                                files.map((file) => (
                                    <tr
                                        key={file.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-800">
                                            {file.id}
                                        </td>
                                        <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-800">
                                            {file.file_name}
                                        </td>
                                        <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-800">
                                            {file.upload_status}
                                        </td>
                                        <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-800">
                                            {file.uploaded_at}
                                        </td>
                                        <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-800">
                                            {file.completed_at}
                                        </td>
                                        <td className="px-6 py-3 border-b border-gray-300 text-sm">
                                            {file.upload_status ===
                                                "Completed" && (
                                                <a
                                                    href={`/file/${file.id}`}
                                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                                >
                                                    View Data
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center px-6 py-3 border-b border-gray-300 text-sm text-gray-500"
                                    >
                                        No files available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FileTable;
