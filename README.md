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
