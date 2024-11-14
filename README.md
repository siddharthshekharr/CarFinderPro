# CarFinder Pro

CarFinder Pro is a web application that allows users to search for cars based on various criteria and save their search data. It provides an intuitive interface for car enthusiasts to find their dream vehicles.

## Features

1. Advanced Car Search:
   - Filter by make, model, body type, year range, transmission, fuel type, mileage, price, drive type, and seating capacity.
   - Dynamic model selection based on chosen make.
   - Slider inputs for mileage and price ranges.

2. Budget-based Search:
   - Quick search option based on budget range.

3. Search Data Storage:
   - Saves user search data to a CSV file.
   - Provides feedback on successful data storage.

4. CSV Download:
   - Allows users to download the compiled search data as a CSV file.

5. Responsive Design:
   - Optimized for both desktop and mobile devices.

## Tech Stack

- Next.js 14
- React
- Tailwind CSS
- ShadCN UI Components
- React Hot Toast for notifications

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/your-username/carfinder-pro.git
   cd carfinder-pro
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add any necessary environment variables.

4. Place your `car_database.json` file in the `public` folder. This file should contain the car makes, models, and other filter options.

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app/page.js`: Main component with the search interface.
- `src/app/api/saveSearch/route.js`: API route for saving search data to CSV.
- `src/app/api/downloadSearches/route.js`: API route for downloading the CSV file.
- `public/car_database.json`: JSON file containing car data and filter options.
- `public/searches.csv`: CSV file where search data is stored.

## Deployment

This project is set up to be easily deployed on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
