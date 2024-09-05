from fastapi import APIRouter, Response, Request, HTTPException
from app.service.authentication_service import AuthenticationService
from app.schema.authentication_schema import LoginUser, RegisterUser
import jwt

from app.util.helper import Helper

router = APIRouter()
helper = Helper()

@router.post("/login")
async def login(user: LoginUser, response: Response):
        result = AuthenticationService.login(email=user.email, password=user.password)
        response.set_cookie(
            key="access_token", value=result["access_token"], httponly=True
        )
        response.set_cookie(
            key="refresh_token", value=result["refresh_token"], httponly=True
        )
        return {"message": "Login is successful."}


@router.post("/register", status_code=201)
async def register(user: RegisterUser):
    return AuthenticationService.register(payload=user)

@router.post("/verify", status_code=200)
async def verify_user(request: Request):
    try:
        auth_header = request.cookies.get("access_token") and request.cookies.get("refresh_token")
        if auth_header is not None:
            user_id = helper.decode_jwt(token=auth_header)
            result = AuthenticationService.verify_user(user_id)
            return {
                "success": True,
                "user": {
                    "email": result.email
                },
            }
        else:
            raise HTTPException(status_code=401, detail="Unauthorized")
    except jwt.ExpiredSignatureError as e:
        raise HTTPException(status_code=403, detail=str(e))


@router.post("/logout")
async def logout(response: Response) -> dict[str, str]:
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "you are logged out."}
