import uuid

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from spa.middleware import SPAMiddleware


class AutoCookieMiddleware(SPAMiddleware):
    """Adds support for serving a single-page app (SPA)
    with frontend routing on /
    """

    def anonymous_or_real(self, request):
        # do we have an existing user?
        if request.user.is_authenticated:
            return request.user
        else:
            # if not, create an anonymous user and log them in
            username = str(uuid.uuid4())
            user = User(username=username, first_name='Anonymous', last_name='User')
            user.set_unusable_password()
            user.save()
            authenticate(user=user)
            login(request, user)
            return user

    def process_request(self, request):
        self.anonymous_or_real(request)

