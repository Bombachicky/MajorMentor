import { generatePDF } from '../../api/generatePDF';


export function EmptyPdf() {
    return (
        <div>
            <h1>Study Materials Generator</h1>
            <button onClick={generatePDF}>Generate PDF for Computer Science</button>
        </div>
    );
};
