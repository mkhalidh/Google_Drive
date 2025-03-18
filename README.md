

# Google Drive Clone

This project is a clone of Google Drive, where users can upload and download files, with files stored on Firebase. It also provides real-time updates on file upload progress, file size, and timestamps of last modification.

## Features

- **File Upload:** Users can upload files to Firebase Storage.
- **File Download:** Users can download files from Firebase Storage.
- **File Info:** Displays file name, size, and last modified timestamp.



## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Firebase (Firestore & Storage)
- **Icons:** Material UI Icons


## Setup and Installation

To get started with the project, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/mkhalidh/Google_Drive.git
```

### 2. Install Dependencies

Navigate to the project folder and install the required dependencies:

```bash
cd Google_Drive
npm install
```

### 3. Set Up Firebase

- Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Enable Firestore and Firebase Storage in your Firebase project.
- Copy the Firebase configuration object from the Firebase console.

### 4. Configure Firebase in Your Project

Create a `.env` file in the root directory and add the Firebase configuration like below:

```env
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
```

Alternatively, you can directly edit the `firebase.js` file with your configuration details.

### 5. Run the Project

Once you've set up Firebase, run the app locally:

```bash
npm start
```

This will start the development server and open the app in your default web browser.

## How It Works

1. **Uploading Files:**
   - When a user selects a file to upload, it is uploaded to Firebase Storage.
   - The file metadata (e.g., file name, size, URL, and type) is stored in Firebase Firestore.
   - The file is then displayed in the app's file list, showing its name, size, and last modified time.

2. **Downloading Files:**
   - Users can click the "Download here" button next to a file, which will initiate the file download from Firebase Storage.

3. **File Information:**
   - The app displays the file name, owner, last modified date, and size for each file in the user's drive.
   - Files are categorized by their type (e.g., images, documents).

## File Structure

- **`App.js`**: Main component that includes header, sidebar, and file data.
- **`Data.js`**: Component responsible for displaying uploaded files, including details like name, size, and last modified time.
- **`Header.js`**: Header component with app logo, search bar, and user options.
- **`Sidebar.js`**: Sidebar navigation with file storage options, upload button, and progress bar.
- **`firebase.js`**: Firebase configuration and initialization.
- **`index.js`**: Entry point for React, where the App component is rendered.

## Future Improvements

- Add **Google Authentication** for user login (currently commented out).
- Implement a **progress bar** for file uploads.
- Improve **file management** features such as creating folders, organizing files, etc.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

