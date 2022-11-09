import json
import base64
import os
import smtplib
from email.message import EmailMessage
from google.cloud import firestore

def subscribeMeal(request):
    print(request)
    req = request.get_json()
    print(req)
    # TODO implement
    decoded_data = base64.b64decode(req['message']['data'])
    print(decoded_data)
    order = json.loads(decoded_data.decode("utf-8"))
    print(order)

    userid = order['userid']
    dishName = order['title']
    userEmail = order['email']
    mealPrice = str(order['price'])
    
    confirmationMessage = "Dear Customer" + ",\n\n" + "Your meal order has been placed successfully with B&B.\nBelow are your meal order details:\n"+"Dish Name: "+dishName +  "\nPrice: " + mealPrice +  "\n\n" + "Thank you for using our service.\n"+"Enjoy your meal!\n\n"+"Best Regards,\nServerless B&B"

# "Dear "+userName+",\n\n" + "Your room has been placed successfully booked with B2B.\nBelow are your booking details:\n"+"Room No: "+roomNumber+"\nStart Date: "+startDate+"\nEnd Date: "+endDate+"\n\n"+"Thank you for using our service.\n"+"Happy Stay!\n\n"+"Best Regards,\nServerless B&B"
    print(confirmationMessage)

    data = {
        "userid": userid,
        "notification": confirmationMessage
    }

    db = firestore.Client()
    # addDoc = db.collection(u'notification').document().set(data)
    addDoc = db.collection(u'notification').document(userid).set({"notification": firestore.ArrayUnion([confirmationMessage])}, merge=True)

    print(addDoc) 

    mailFrom= os.getenv('MAIL_FROM', '').strip()
    mailTo= userEmail.strip()
    mailSubject= os.getenv('MAIL_SUBJECT', '').strip()
    mailServer = os.getenv('MAIL_SERVER', '').strip()
    mailport = os.getenv('MAIL_PORT', '').strip()
    mailPass= os.getenv('MAIL_PASSWORD', '').strip()
    
    debugFlag = "TRUE"
    forceTlsFlag = "TRUE"

    # Log all of the environment variables.

    if debugFlag:
        print('Mail from: {}'.format(mailFrom))
        print('Mail to: {}'.format(mailTo))
        print('Mail subject: {}'.format(mailSubject))
        print('Mail server: {}'.format(mailServer))
        print('Mail port: {}'.format(mailport))
        print('Mail message body: {}'.format(confirmationMessage))
        
     # Create EmailMessage object for eventual transmission.

    outboundMessage = EmailMessage()
    outboundMessage.set_content(confirmationMessage)
    outboundMessage['Subject'] = mailSubject
    outboundMessage['From'] = mailFrom
    outboundMessage['To'] = mailTo
    
    
    if forceTlsFlag:
        smtpServer = smtplib.SMTP_SSL(host=mailServer, port = mailport)
    else:
        smtpServer = smtplib.SMTP(host=mailServer, port = mailport)

    smtpServer.login(mailFrom, mailPass)
    smtpServer.send_message(outboundMessage)
    smtpServer.quit()
    
    return "Notification Added Successfully"