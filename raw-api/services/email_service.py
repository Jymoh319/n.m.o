from flask_mail import Message
from extensions import mail


def send_email(recipient, subject, body):
    message = Message(
        subject=subject,
        recipients=[recipient],
        body=body
    )

    mail.send(message)