SkyCast - Advanced Weather Dashboard
SkyCast is a modern, responsive weather application built with React. It provides real-time weather data, including current conditions and detailed hourly/daily forecasts for any location worldwide. The app features a sleek dark-themed UI and allows users to customize units for a personalized experience.

🚀 Live Demo
https://skycast-weather-app-ten.vercel.app/

✨ Features
Global Search: Search for any city or country using the Open-Meteo Geocoding API.

Dynamic Backgrounds: Immersive UI that feels modern and clean.

Hourly Forecast: Detailed 24-hour weather breakdown with the ability to filter by day of the week.

7-Day Forecast: Accurate daily predictions including high/low temperatures and weather conditions.

Unit Customization: Toggle between:

Temperature: Celsius (°C) / Fahrenheit (°F).

Wind Speed: Km/h, m/s, Mph, Knots.

Precipitation: Millimeters (mm) / Inches (inch).

Responsive Design: Fully optimized for Mobile, Tablet, and Desktop screens.

Smart UX: * Automatic search for a random country on initial load.

"Retry" mechanism for error handling.

Controlled search input that clears after submission.

🛠️ Tech Stack
Framework: React.js

Icons: FontAwesome & Custom WebP Weather Icons.

Components: Material UI (Circular Progress).

API: Open-Meteo API (Geocoding & Forecast).

Styling: Custom CSS3 (Flexbox & Grid).

⚙️ Logic Highlights
Effect Management: Used useEffect with AbortController to handle race conditions during data fetching.

Data Slicing: Implemented logic to slice 168 hours of API data into specific 24-hour segments based on user selection.

📸 Screenshots

Desktop View


![desktop-design-imperial](https://github.com/user-attachments/assets/701015c7-e283-42a0-ac93-49c980bfe66d)

Mobile View


![mobile-design-imperial](https://github.com/user-attachments/assets/94ce9313-dbc7-4e4e-8340-6b3b228add46)

🔧 Installation & SetupClone the repository:Bashgit clone https://github.com/your-username/skycast-weather-app.git
Install dependencies:Bashnpm install
Start the development server:Bashnpm start

👨‍💻 AuthorYour 
NameGitHub: okadiab2000
LinkedIn: Mohamed Ismail

Weather Mapping: Custom function to map WMO weather codes (0-99) to specific visual icons.

Dynamic Sorting: Weekday logic that dynamically starts the forecast from the current day.
