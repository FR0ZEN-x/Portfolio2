from flask import Flask
import os

app = Flask(__name__)

# Import config correctly with a relative import
import config

# Get configuration from environment or use default
config_name = os.getenv('FLASK_ENV', 'default')
app.config.from_object(config.config[config_name])

# Import routes after creating app to avoid circular imports
from app import routes
