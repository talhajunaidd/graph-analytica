from django.conf.urls import url
from django.contrib.staticfiles.views import serve
from django.urls import include
from django.views.generic import RedirectView

urlpatterns = [
    url(r'^$', serve, kwargs={'path': 'index.html'}),
    url(r'^$', serve, kwargs={'path': 'index.html'}),
    url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
        RedirectView.as_view(url='/static/%(path)s', permanent=False)),
    url(r'^api/', include('graphanalytica.api.urls')),
]
