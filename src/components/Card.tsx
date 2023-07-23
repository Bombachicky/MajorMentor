import { EmptyPdf } from "./EmptyPdf"

interface Props {
    course : string,
    image  : string
}

export function Card({ course, image } : Props){
    
    return(
        <>
            <div className="max-w-sm mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={image} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="font-averox flex justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course}</h5>
                    </a>
                    <EmptyPdf />
                </div>
            </div>
        </>
    )
}