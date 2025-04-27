from flask import render_template, jsonify, request
from portfolio2 import app, razorpay_client

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


@app.route('/create-order', methods=['POST'])
def create_order():
    # Get the amount from the request
    data = request.get_json()

    # Default to 50000 paise if no amount is provided
    amount = data.get('amount', 50000) if data else 50000

    order_data = {
        'amount': amount,
        'currency': 'INR',
        'payment_capture': '1',  # 1 for auto capture
    }

    # Create Razorpay order
    order = razorpay_client.order.create(data=order_data)

    return jsonify(order)

@app.route('/eidi')
def eidi():
    return render_template('eidi.html', razorpay_key_id=app.config['RAZORPAY_KEY_ID'])

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
