import io
from django.conf import settings
from django.shortcuts import render
from django.http import FileResponse, HttpResponse
import openai
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Frame, PageTemplate, BaseDocTemplate, Flowable
from reportlab.lib.colors import black, yellow
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT
from reportlab.graphics.shapes import Drawing, Line, LineShape
from reportlab.graphics import renderPDF
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Course
from .serializers import *


openai.api_key = settings.OPENAI_API_KEY

def index(request):
    return HttpResponse("Hello, world.")

@api_view(['GET', 'POST'])
def course_list(request):
    if request.method == 'GET':
        data = Course.objects.all()

        serializer = CourseSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

# Define a custom Flowable class that draws a line
class LineFlowable(Flowable):
    def __init__(self, width, height, color):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.color = color

    def draw(self):
        d = Drawing(self.width, self.height)
        line = Line(-15, 0, 483, 0)
        line.strokeColor = self.color
        line.strokeWidth = 2
        d.add(line)
        renderPDF.draw(d, self.canv, 0, 0)

def pdf(request, name):
    result = ''
    if openai.api_key is not None:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"Make me a document on how to study {name}"},
            ]
        )       
        result = response['choices'][0]['message']['content']

    # Create a file-like buffer to receive PDF data.
    buffer = io.BytesIO()

    # Create the PDF object, using the buffer as its "file."
    doc = BaseDocTemplate(buffer, pagesize=letter)

    # Define a custom style for the paragraph
    style = ParagraphStyle(
        'Normal',
        fontSize=10,  # Set a smaller font size
        textColor=black,  
        fontName='Times-Roman',  # Use Times-Roman font
        leading=20,  # Increase line spacing to 20 points
    )

    psHeaderText = ParagraphStyle('Hed0', fontSize=16, alignment=TA_LEFT, borderWidth=3, textColor=black)
    text = 'Major Mentor'

    # Create a header
    header = Paragraph(text, psHeaderText)

    # Set the size and position of the frame for the content
    content_frame = Frame(doc.leftMargin + 4, doc.bottomMargin + 0.2*inch, doc.width, doc.height - 0.5*inch)

    # Create a PageTemplate that draws the header on each page
    page_template = PageTemplate(id='main', frames=[content_frame],
                                onPage=lambda canvas, doc: [header.wrapOn(canvas, doc.width, inch),
                                                            header.drawOn(canvas, doc.leftMargin + 4, doc.height + doc.topMargin),
                                                            LineFlowable(500, 1, yellow).drawOn(canvas, 0, doc.height + doc.topMargin - 12),
                                                            LineFlowable(500, 1, yellow).drawOn(canvas, 0, doc.height + doc.topMargin - 14)])


    # Add the PageTemplate to the BaseDocTemplate
    doc.addPageTemplates([page_template])

    # Container for the 'Flowable' objects
    elements = []

    # Create a Paragraph for each line in result and add to elements.
    for line in result.split("\n"):
        elements.append(Paragraph(line, style))
        elements.append(Spacer(1, 12))  # Add some space after each paragraph

    # Generate the PDF
    doc.build(elements)

    # FileResponse sets the Content-Disposition header so that browsers
    # present the option to save the file.
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename="hello.pdf")