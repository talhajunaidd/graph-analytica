from django.conf.urls import url

from api import views

urlpatterns = [
    url(r'^employee/$', views.EmployeeListView.as_view()),
    url(r'^file/$', views.FileView.as_view())
]
