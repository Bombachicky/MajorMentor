import Spinner from './Spinner'

interface Course {
    name: string;
    description: string;
}

import axios from 'axios';
import { useEffect, useState } from 'react';

export function Card() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData(name : string){
        setIsLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/pdf/${name}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name}.pdf`); // or any other extension
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchCourses(setCourses: React.Dispatch<React.SetStateAction<Course[]>>) {
        try {
            const response = await axios.get('http://127.0.0.1:8000/courses/');
            setCourses(response.data);
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    useEffect(() => {
        fetchCourses(setCourses);
    }, []);

    return (
        <>
            <div className="grid lg:grid-cols-2 gap-8 place-items-center">
                {courses.map((course : Course) => (
                    <div
                    key={course.name}
                    onClick={() => fetchData(course.name)}
                    className="flex flex-col justify-center w-[300px] h-[400px] text-ucfyellow border-2 
                    border-ucfyellow rounded-md tracking-[4px] hover:text-purple-900 hover:bg-ucfyellow hover:shadow-glow
                    transition-all duration-200 hover:cursor-pointer mt-4 relative"
                    >
                        {isLoading ? <Spinner /> : (<>
                                                        <div className="grid place-items-center flex-grow">{course.name}</div>
                                                        <div className="grid place-items-center flex-grow">
                                                            <div className="text-[10px] text-center">{course.description}</div>
                                                        </div>
                                                    </>)}
                    </div>
                ))}
            </div>
        </>
    );
}
