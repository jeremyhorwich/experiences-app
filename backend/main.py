from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from presentation import experience_routes, message_routes, user_routes

app = FastAPI()

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router)
app.include_router(experience_routes.router)
app.include_router(message_routes.router)


@app.get("/")
@app.get("/index")
async def display_index():
    return {"message": "index"}