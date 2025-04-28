import os
from dotenv import load_dotenv
import razorpay

# Load environment variables from .env file if present
load_dotenv()

class Config:
    """Base configuration class with common settings."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
    DEBUG = False
    TESTING = False

    # Static and template folders
    STATIC_FOLDER = 'static'
    TEMPLATE_FOLDER = 'templates'


class DevelopmentConfig(Config):
    """Development environment configuration."""
    DEBUG = True
    ENV = 'development'


class TestingConfig(Config):
    """Testing environment configuration."""
    TESTING = True
    DEBUG = True
    ENV = 'testing'


class ProductionConfig(Config):
    """Production environment configuration."""
    ENV = 'production'
    # In production, ensure these are set as environment variables
    SECRET_KEY = os.getenv('SECRET_KEY')


# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}