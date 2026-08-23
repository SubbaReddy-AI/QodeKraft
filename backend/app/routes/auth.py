from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from app.services.auth_service import (
    authenticate_user,
    generate_token,
    register_user,
)
from app.utils.dependencies import get_current_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):

    user = register_user(
        db,
        data.name,
        data.email,
        data.password
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return user


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db,
        data.email,
        data.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return TokenResponse(
        access_token=generate_token(user)
    )


@router.get(
    "/me",
    response_model=UserResponse
)
def me(
    current_user=Depends(
        get_current_user
    )
):

    return current_user