import React, { useState } from "react";

export interface Lesson {
    id: number;
    title: string;
    content: string;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    lessons: Lesson[];
}

const Home: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]); // store all courses
    const [course, setCourse] = useState<Course>({
        id: 0,
        title: "",
        description: "",
        instructor: "",
        duration: "",
        lessons: [{ id: 1, title: "", content: "" }],
    });

    // Handle change for course fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    // Handle change for lesson fields
    const handleLessonChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newLessons: Lesson[] = [...course.lessons];
        newLessons[index] = { ...newLessons[index], [e.target.name]: e.target.value };
        setCourse({ ...course, lessons: newLessons });
    };

    // Add new lesson
    const addLesson = () => {
        setCourse({
            ...course,
            lessons: [...course.lessons, { id: course.lessons.length + 1, title: "", content: "" }],
        });
    };

    // Remove lesson
    const removeLesson = (index: number) => {
        const newLessons = course.lessons.filter((_, i) => i !== index);
        setCourse({ ...course, lessons: newLessons });
    };

    // Submit course
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCourse: Course = { ...course, id: courses.length + 1 }; // auto id
        setCourses([...courses, newCourse]);
        setCourse({
            id: 0,
            title: "",
            description: "",
            instructor: "",
            duration: "",
            lessons: [{ id: 1, title: "", content: "" }],
        });
        alert("Course added! Total courses: " + (courses.length + 1));
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Course Fields */}
                <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={course.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Course Description"
                    value={course.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="instructor"
                    placeholder="Instructor Name"
                    value={course.instructor}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g., 3h 30m)"
                    value={course.duration}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Lessons */}
                <div>
                    <h3 className="font-semibold mb-2">Lessons</h3>
                    {course.lessons.map((lesson, index) => (
                        <div key={lesson.id} className="mb-3 p-2 border rounded space-y-2">
                            <input
                                type="text"
                                name="title"
                                placeholder={`Lesson ${index + 1} Title`}
                                value={lesson.title}
                                onChange={(e) => handleLessonChange(index, e)}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <textarea
                                name="content"
                                placeholder={`Lesson ${index + 1} Content`}
                                value={lesson.content}
                                onChange={(e) => handleLessonChange(index, e)}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeLesson(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Remove Lesson
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addLesson}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Lesson
                    </button>
                </div>

                {/* Submit */}
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded mt-4">
                    Add Course
                </button>
            </form>

            {/* Display Courses */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">Courses List</h3>
                {courses.map((c) => (
                    <div key={c.id} className="p-2 border rounded mb-2">
                        <h4 className="font-semibold">{c.title}</h4>
                        <p>{c.description}</p>
                        <p>Instructor: {c.instructor}</p>
                        <p>Duration: {c.duration}</p>
                        <p>Lessons: {c.lessons.length}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;