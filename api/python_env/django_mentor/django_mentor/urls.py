"""
URL configuration for django_mentor project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import views
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
import sys

# setting path
sys.path.append('../../courses')

# importing
from courses.views import CreateCourseView, ListCoursesView, DetailCourseView, HomePageView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('courses/create/', CreateCourseView.as_view(), name='create_course'),
    path('courses/', ListCoursesView.as_view(), name='list_courses'),
    path('courses/<int:course_id>/', DetailCourseView.as_view(), name='detail_course'),
    path('', HomePageView.as_view(), name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
