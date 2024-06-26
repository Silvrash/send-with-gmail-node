# Gmail Class for Sending Emails

This class facilitates sending emails through a Google account using the Gmail API. It provides methods for authorization, composing, and sending emails.

## Setup

### 1. Obtain Google API Credentials

Before using the Gmail class, you need to obtain credentials for the Gmail API:

1. Go to the [Google Developers Console](https://console.developers.google.com/).
2. Create a new project or select an existing one.
3. Enable the Gmail api. ![image](https://github.com/Silvrash/send-with-gmail-node/assets/35709836/1ac80517-8fd2-47fb-90cc-adfc11dfb7b1)
4. Configure OAuth Consent Screen.
   ![image](https://github.com/Silvrash/send-with-gmail-node/assets/35709836/6085fee1-6931-4e51-9023-289c104e0a61)    
   You can decide to Select External as a user type but you'll have to wait a while for google to approve your application.

6. Add OAuth 2.0 Scopes. Click the Add Or Remove Scopes button and add https://www.googleapis.com/auth/gmail.send to the list of scopes since we only want to send emails from Gmail.
   ![image](https://github.com/Silvrash/send-with-gmail-node/assets/35709836/ae5ca03c-bfed-41bd-8e83-2a7822c0c237)
7. Navigate to the **Credentials** tab.
8. Click on **Create credentials** and select **OAuth client ID**.
9. Choose the application type as **Desktop app**.
10. Click **Create**.
11. Download the credentials file in JSON format and save it as `credentials.json` in the same directory as your code.

### 2. Installation

Make sure you have Node.js installed on your system.

1. Clone or download the repository containing the Gmail class.
2. Install the required npm packages by running:

```
npm install
```

### 3. Usage

1. Instantiate the Gmail class:

```javascript
import { Gmail } from "./Gmail";

const gmail = new Gmail();
```

2. Authorize the application:

```javascript
await gmail.authorizeApplication();
```

This will generate a URL for authorization. Open the URL in your browser and authorize the application. After authorization, you'll receive an authorization code.

Example Authorization URL: `http://localhost/?code=YOUR_AUTHORIZATION_CODE&scope=https://www.googleapis.com/auth/gmail.send`

3. Save the authorization code by calling `authorizeApplication` again with the code:

```javascript
const authorizationCode = "YOUR_AUTHORIZATION_CODE";
await gmail.authorizeApplication(authorizationCode);
```

This will save the authorization token to `token.json`, which will be used for subsequent requests.

4. Send an email:

```javascript
await gmail.sendEmail("recipient@example.com", "Subject", "Body");
```

Replace `"recipient@example.com"`, `"Subject"`, and `"Body"` with the recipient's email address, subject, and body of the email respectively.

### Note:

- You only need to authorize the application once. The authorization token will be saved and used for subsequent email sending requests.
- Ensure that the scopes in `get_authorization_code()` match your requirements. The example provided includes the scope for sending emails (`https://www.googleapis.com/auth/gmail.send`).
