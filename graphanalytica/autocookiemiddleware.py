import uuid


class AutoCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        user_id = request.COOKIES.get('user_id')
        if user_id is None:
            response.set_cookie('user_id', uuid.uuid4())
        return response
