from django.conf.urls import url

from graphanalytica.api import views

urlpatterns = [
    url(r'^file/$', views.FileView.as_view()),
    url(r'^node/$', views.NodeView.as_view()),
    url(r'^edge/$', views.EdgeView.as_view())
]
