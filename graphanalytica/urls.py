from django.conf.urls import url
from django.urls import include

urlpatterns = [
    # url(r'^$', serve, kwargs={'path': 'index.html'}),
    # url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
    #     RedirectView.as_view(url='/static/%(path)s', permanent=False)),
    url(r'^api/', include('graphanalytica.api.urls')),
]
