from ..database import SessionLocal
from fastapi import HTTPException
from ..model import User
from app.schema.authentication_schema import RegisterUser
from app.util.helper import Helper
from sqlalchemy.exc import SQLAlchemyError

helper = Helper()

class AuthenticationService:

    @staticmethod
    def verify_user(id: int):
        db = SessionLocal()
        user = db.query(User).filter_by(id=id).first()
        if user:
            return user
        else:
            return False


    @staticmethod
    def login(email: str, password: str) -> dict[str, str]:
        db = SessionLocal()
        try:
            user = db.query(User).filter_by(email=email).first()
            if user is None or not helper.match_hash_text(str(user.password), password):
                raise HTTPException(status_code=400, detail="Email or password wrong!")
            access_token = helper.generate_access_token({"user_id": user.id})
            refresh_token = helper.generate_refresh_token({"user_id": user.id})
            return {"access_token": access_token, "refresh_token": refresh_token}
        except HTTPException as http_exc:
            raise http_exc
        except SQLAlchemyError:
            raise HTTPException(status_code=500, detail="An unexpected server error occurred.")
        finally:
            db.close()

    @staticmethod
    def register(payload: RegisterUser):
        db = SessionLocal()
        try:
            existing_user = db.query(User).filter_by(email=payload.email).first()
            if existing_user:
                raise HTTPException(status_code=400, detail="Email already registered!")
            user = User(
                email=payload.email,
                password=helper.generate_hash_password(payload.password)
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            return {"message": "Account created."}
        except SQLAlchemyError:
            db.rollback()
            raise HTTPException(status_code=500, detail="An unexpected server error occurred.")
        finally:
            db.close()

