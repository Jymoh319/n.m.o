from flask_restful import Resource


class GoogleLoginResource(Resource):
    def get(self):
        return {
            "message": "Google login endpoint not implemented yet."
        }, 501


class GoogleCallbackResource(Resource):
    def get(self):
        return {
            "message": "Google callback endpoint not implemented yet."
        }, 501