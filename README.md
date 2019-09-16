## Purpose:
If you want to move some passwords from Enpass to 1 Password, this is for you. 1 Password can't open the Enpass csv export because Enpass didn't follow correct CSV conventions. This little node script uses the more standardized JSON export of enpass to generate a valid CSV for 1 Password to consume.

This only supports basic login info (title, URL, username/email, password), so extra stuff like notes won't pass through. Feel free to submit a PR to add extra useful functionality.

## Run the script:
```sh
node enpass-1pass-convert.js # If all is successful, it will tell you.
```
