import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///userdata.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False