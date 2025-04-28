from flask import render_template
from app import app
import hmac
import hashlib
import os

@app.route('/')
@app.route('/about')
def about():
    return render_template('about.html', active_page='about')

@app.route('/resume')
def resume():
    return render_template('resume.html', active_page='resume')

@app.route('/projects')
def projects():
    return render_template('projects.html', active_page='projects')

@app.route('/contact')
def contact():
    return render_template('contact.html', active_page='contact')


@app.route('/eidi')
def eidi():
    """Render the Eidi donation page with Razorpay key"""
    return render_template('eidi.html', active_page='eidi')

@app.route('/blog')
def blog():
    return render_template('blog.html', active_page='blog')

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

# Misc routes
@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/robots.txt')
def robots():
    return '', 204

@app.route('/sitemap.xml')
def sitemap():
    return '', 204
