import uuid


class AutoCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        unique_id = request.COOKIES.get('uuid')
        if unique_id is None:
            response.set_cookie('uuid', uuid.uuid4())
        return response
