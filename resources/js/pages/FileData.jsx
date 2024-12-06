import React, { useState, useEffect } from "react";
import NavBar from "./navbar";
const FileData = ({ id }) => {
    const [fileData, setFileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const response = await fetch(`/user/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch file data");
                }
                const data = await response.json();
                setFileData(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFileData();
    }, [id]);

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
                        File Data
                    </h2>
                    <p className="text-sm text-gray-500">
                        Excel-like data from the uploaded file.
                    </p>
                </header>

                <div className="overflow-x-auto max-h-[520px] border border-gray-300">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-300 text-left  font-medium text-black">
                                    #
                                </th>
                                {fileData.length > 0 &&
                                    Object.keys(fileData[0].data).map((key) => (
                                        <th
                                            key={key}
                                            className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-600"
                                        >
                                            {key}
                                        </th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 border-b border-gray-300 text-sm text-gray-800">
                                        {index + 1}
                                    </td>
                                    {Object.values(row.data).map(
                                        (value, idx) => (
                                            <td
                                                key={idx}
                                                className="px-6 py-3 border-b border-gray-300 text-sm text-gray-800"
                                            >
                                                {value}
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FileData;
