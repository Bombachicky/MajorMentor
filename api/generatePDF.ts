import { config } from "dotenv";
import { jsPDF } from "jspdf";
import { Configuration, OpenAIApi} from "openai";

config();

// initialize openai with the api key
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}));

export async function generatePDF() {
    const doc = new jsPDF();

    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Generate a course problem and study guide for a computer science course."}],
    })
    .then((gptResponse) => {
        const gptContent = gptResponse.data.choices[0].message?.content;
        if(gptContent){
            console.log(gptContent)
            doc.text(`Course Problem and Study Guide: `, 10, 10);
            doc.text(gptContent, 10, 20);
        }
        doc.save("study_materials.pdf");
    })
    .catch((error: Error) => console.error(error));
};