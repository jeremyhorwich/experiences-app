from typing import Annotated

from dependencies import limiter
from fastapi import APIRouter, Depends
from presentation.models.PostCreateUserRequest import PostCreateUserRequest
from presentation.models.PostCredentialRequest import PostCredentialRequest
from services.authentication_service import AuthenticationService
from starlette.requests import Request

router = APIRouter(prefix="/authentication")


authentication_service_instance = AuthenticationService()


def get_authentication_service() -> AuthenticationService:
    return authentication_service_instance


authentication_service_dependency = Annotated[
    AuthenticationService, Depends(get_authentication_service)
]


@router.post("/signup")
async def create_user(
    request: PostCreateUserRequest,
    authentication_service: authentication_service_dependency,
):
    result = await authentication_service.create_new(request.credential, request.user)
    return result


@router.post("/login")
@limiter.limit("10/minute")
async def login(
    request: Request,  # pylint: disable=unused-argument
    credential_request: PostCredentialRequest,
    authentication_service: authentication_service_dependency,
):
    result = await authentication_service.verify_login(credential_request.credential)
    return result
