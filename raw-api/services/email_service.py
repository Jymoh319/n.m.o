from flask_mail import Message
from extensions import mail


def send_email(recipient, subject, html):
    message = Message(
        subject=subject,
        recipients=[recipient]
    )

    message.html = html

    mail.send(message)