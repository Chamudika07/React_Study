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
        <div className="home-container">
            <div className="home-header">
                <h1>Course Management System</h1>
                <p>Create and manage your courses and lessons</p>
            </div>
            <form onSubmit={handleSubmit} className="course-form-section">
                <h2>Create New Course</h2>
                {/* Course Fields */}
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="title">Course Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Course Title"
                            value={course.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="instructor">Instructor Name</label>
                        <input
                            type="text"
                            id="instructor"
                            name="instructor"
                            placeholder="Instructor Name"
                            value={course.instructor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row full">
                    <div className="form-field">
                        <label htmlFor="description">Course Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Course Description"
                            value={course.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="duration">Duration (e.g., 3h 30m)</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            placeholder="Duration (e.g., 3h 30m)"
                            value={course.duration}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Lessons */}
                <div className="lessons-section">
                    <h3>Lessons</h3>
                    {course.lessons.map((lesson, index) => (
                        <div key={lesson.id} className="lesson-item">
                            <div className="form-row">
                                <div className="form-field full">
                                    <label>Lesson {index + 1} Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder={`Lesson ${index + 1} Title`}
                                        value={lesson.title}
                                        onChange={(e) => handleLessonChange(index, e)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row full">
                                <div className="form-field">
                                    <label>Lesson {index + 1} Content</label>
                                    <textarea
                                        name="content"
                                        placeholder={`Lesson ${index + 1} Content`}
                                        value={lesson.content}
                                        onChange={(e) => handleLessonChange(index, e)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            {course.lessons.length > 1 && (
                                <div className="lesson-buttons">
                                    <button
                                        type="button"
                                        onClick={() => removeLesson(index)}
                                        className="btn-remove"
                                    >
                                        Remove Lesson
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addLesson}
                        className="btn-add"
                    >
                        + Add Lesson
                    </button>
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary">
                    Add Course
                </button>
            </form>

            {/* Display Courses */}
            <div className="courses-list-section">
                <h2>Courses List ({courses.length})</h2>
                {courses.length === 0 ? (
                    <p className="text-center text-gray-500">No courses created yet. Create your first course above!</p>
                ) : (
                    <div className="courses-grid">
                        {courses.map((c) => (
                            <div key={c.id} className="course-card">
                                <span className="badge">Course #{c.id}</span>
                                <h4>{c.title}</h4>
                                <p>{c.description}</p>
                                <div className="course-meta">
                                    <div>
                                        <strong>Instructor:</strong> {c.instructor}
                                    </div>
                                    <div>
                                        <strong>Duration:</strong> {c.duration}
                                    </div>
                                </div>
                                <p style={{ marginTop: '1rem' }}>
                                    <strong>Lessons: {c.lessons.length}</strong>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;