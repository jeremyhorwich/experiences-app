from typing import Annotated

from fastapi import APIRouter, Depends
from presentation.models.PostCredentialRequest import PostCredentialRequest
from services.authentication_service import AuthenticationService

router = APIRouter(prefix="/authentication")


authentication_service_instance = AuthenticationService()


def get_authentication_service() -> AuthenticationService:
    return authentication_service_instance


authentication_service_dependency = Annotated[
    AuthenticationService, Depends(get_authentication_service)
]


@router.post("/signup")
async def create_user(
    request: PostCredentialRequest,
    authentication_service: authentication_service_dependency,
):
    result = await authentication_service.create_new(request.credential)
    return result
