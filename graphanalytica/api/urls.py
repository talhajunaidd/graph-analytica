from django.conf.urls import url

from graphanalytica.api import views

urlpatterns = [
    url(r'^file/$', views.FileView.as_view()),
    url(r'^node/$', views.NodeView.as_view()),
    url(r'^edge/$', views.EdgeView.as_view()),
    url(r'^graph/$', views.GraphView.as_view()),
    url(r'^graph/parameters/$', views.StateGraphParametersView.as_view()),
    url(r'^graph/stategraph/$', views.StateGraphView.as_view()),
    url(r'^graph/stategraph/cycles/$', views.CyclesView.as_view()),
    url(r'^graph/stategraph/deadlocks/$', views.DeadlocksView.as_view())
]
