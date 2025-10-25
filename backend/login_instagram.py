from instagrapi import Client
from instagrapi.exceptions import ChallengeRequired
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Your credentials
USERNAME = 'flip.filex'
PASSWORD = 'Malik30277$$$'
SESSION_FILE = 'instagram_session.json'
VERIFICATION_CODE = '286776'

def challenge_code_handler(username, choice):
    """Automatically provide the verification code"""
    print(f"Using verification code: {VERIFICATION_CODE}")
    return VERIFICATION_CODE

try:
    print("\n" + "="*60)
    print("Logging into Instagram with verification code")
    print("="*60 + "\n")

    # Create client
    cl = Client()

    # Set the challenge code handler
    cl.challenge_code_handler = challenge_code_handler

    # Login
    print(f"Logging in as: {USERNAME}")
    cl.login(USERNAME, PASSWORD)

    # Save session
    cl.dump_settings(SESSION_FILE)

    print("\n" + "="*60)
    print("SUCCESS! Logged in and saved session")
    print("="*60 + "\n")
    print(f"Session saved to: {SESSION_FILE}")
    print("This session will be used for all future requests!\n")

except Exception as e:
    print("\n" + "="*60)
    print("ERROR!")
    print("="*60 + "\n")
    print(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()
