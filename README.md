## How to Run the Project

## 1. **Clone the repository**
git clone https://github.com/Himanshumamba/HPChatbotAI.git
cd HPChatbotAI

## Install dependencies

npm install

## Create a .env file in the project root and add your OpenAI API key:

 REACT_APP_OPENAI_API_KEY=your_openai_api_key_here


## Start the development server

 npm start


## Project Architecture Notes

- **FormRegister.tsx** – Main multi-step form component.
- **useForm (react-hook-form)** – Manages form state and validation.
- **axios** – Handles API requests to OpenAI.
- **LocalStorage** – Saves form progress per step automatically.
- **Tailwind CSS** – Used for styling all buttons, inputs, and progress bar.

## Optional Improvements / Future Versions

- **i18n support** – English + Arabic translation with RTL layout.
- **Error handling improvements** – Show inline error messages for failed API calls.
- **AI modal enhancements** – Allow selecting which field to insert AI suggestion.
- **Styling improvements** – Better form UI, responsive design, and animations.
- **Form validation** – Stricter validation per field type (email, phone, etc.).
