import { movies } from '../data/moviesData';
import { useState } from "react";

export function HaederInput() {
    // useState(false) for showSummarize - controls which page to show
    const [showSummarize, setShowSummarize] = useState(false);

    // useState({...}) for formData - stores the form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        selectedMovie: '',
        comment: ''
    });

    // useState({}) for errors - stores validation error messages
    const [errors, setErrors] = useState({});

    function validateForm(data) {
        const newErrors = {};

        // Check if name is empty
        if (!data.name) {
            newErrors.name = 'โปรดใส่ชื่อของคุณ';
        }

        // Check if email is empty
        if (!data.email) {
            newErrors.email = 'โปรดใส่อีเมลของคุณ';
        } else {
            // Check email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
            }
        }

        // Check if movie is selected
        if (!data.selectedMovie) {
            newErrors.selectedMovie = 'กรุณาเลือกหนังที่คุณชอบ';
        }

        setErrors(newErrors);
        // Check error count
        return Object.keys(newErrors).length === 0;
    };

    function handleFormSubmit(event) {  // ← Change from (data) to (event)
        event.preventDefault();  // ← Add this to prevent page refresh

        const form = event.target;  // ← Get the form element
        const name = form.name.value;
        const email = form.email.value;
        const selectedMovie = form.option.value;
        const comment = form.comment.value;

        const newFormData = {
            name,
            email,
            selectedMovie,
            comment
        };

        // Validate and submit
        if (validateForm(newFormData)) {
            setFormData(newFormData);
            setShowSummarize(true);
            setErrors({});
        }
    };

    function handleReset() {
        setFormData({
            name: '',
            email: '',
            selectedMovie: '',
            comment: ''
        });
        setErrors({});
        setShowSummarize(false);
    };

    if (showSummarize) {
        return <SummarizePage formData={formData} onReset={handleReset} />;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-20 mt-8">
                    <h1>Favorite Movie</h1>
                </div>
                <form className="w-full" onSubmit={handleFormSubmit}>  {/* ← onSubmit here */}
                    <InfoInput formData={formData} errors={errors} />
                    <SelectMovies formData={formData} errors={errors} />
                    <AddComment formData={formData} />
                    <SubmitButton formData={formData} />  {/* ← Remove onSubmit prop */}
                </form>
            </div>
        </div>
    )
}

function InfoInput(props) {
    return (
        <div className="rounded-lg">
            <div className='mb-3'>
                <h3 className="text-3xl font-bold">Enter your Info</h3>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.errors?.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {props.errors?.name && (
                        <p className="text-red-500 text-sm mt-1">{props.errors.name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.errors?.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {props.errors?.email && (
                        <p className="text-red-500 text-sm mt-1">{props.errors.email}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

function SelectMovies(props) {
    return (
        <div>
            <div className='mb-3 mt-5'>
                <h3 className="text-3xl font-bold">Select Your Favorite Movie</h3>
            </div>
            <div className="flex flex-wrap justify-between gap-5">
                {movies.map((movie, index) => (
                    <div key={index} className="w-72 border border-gray-300 rounded-lg shadow-sm">
                        <div className="h-48 bg-gray-100 border-b border-gray-200 flex items-center justify-center">
                            <span className="text-5xl text-gray-500">🎬</span>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id={`movie-${index}`}
                                    name="option"
                                    value={movie.title}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <label htmlFor={`movie-${index}`} className="text-sm font-medium">{movie.title}</label>
                            </div>
                            <p className="text-gray-600 mt-3">
                                {movie.year} • {movie.director}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {props.errors?.selectedMovie && (
                <p className="text-red-500 text-sm mt-2">{props.errors.selectedMovie}</p>
            )}
        </div>
    )
}

function AddComment() {
    return (
        <div>
            <div className='mb-3 mt-5'>
                <h3 className="text-3xl font-bold">Add Your Comment</h3>
            </div>
            <div className="space-y-4">
                <div>
                    <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                        Your Comment
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        placeholder="Share your thoughts about the movie..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                </div>
            </div>
        </div>
    )
}

function SubmitButton(props) {
    return (
        <div className="mt-8 mb-8 text-center">
            <button
                type="submit"  // ← Keep this
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
                Submit
            </button>
        </div>
    )
}

function SummarizePage(props) {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
                <div className='mb-20 mt-8'>
                    <h1 className="text-3xl font-bold">Your Favorite Movie</h1>
                </div>

                <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Section - Text Inputs/Comments */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Name</h3>
                                <p className="text-gray-900 text-xl">
                                    {props.formData.name}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Email</h3>
                                <p className="text-gray-900 text-xl">
                                    {props.formData.email}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Comment</h3>
                                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 min-h-[100px]">
                                    {props.formData.comment ? (
                                        <p className="text-gray-900">{props.formData.comment}</p>
                                    ) : (
                                        <p className="text-gray-500 italic">No comment provided</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Movie Placeholder */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                                <div className="text-center">
                                    <span className="text-6xl text-gray-400 mb-2 block">🎬</span>
                                    <p className="text-gray-500 text-sm">Movie Poster</p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700">Movie</h3>
                            <p className="text-gray-900 text-xl mt-2 text-center">
                                {props.formData.selectedMovie}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reset Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={props.onReset}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 mx-auto"
                    >
                        <span>←</span>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

