import React, { useState } from "react";

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a
                            href="/"
                            className="text-2xl font-bold tracking-wide"
                        >
                            HasbiSoft
                        </a>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        <a
                            href="/upload"
                            className="hover:underline hover:text-gray-200 transition duration-300"
                        >
                            Home
                        </a>
                        <a
                            href="/history"
                            className="hover:underline hover:text-gray-200 transition duration-300"
                        >
                            History
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button
                            className="text-white hover:text-gray-300 focus:outline-none"
                            aria-label="Toggle Menu"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a
                                href="/upload"
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
                            >
                                Home
                            </a>
                            <a
                                href="/history"
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
                            >
                                History
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
