# 🍕 FoodDrop - Food Delivery App

A modern food delivery web application built with React and Vite.

## Features

- 🛒 Browse menu and add items to cart
- 🔐 User authentication (Login/Signup)
- 💳 Multiple payment options (Online & Cash on Delivery)
- 📦 Real-time order tracking
- 📱 Responsive design
- ❓ Help & Support page
- 📖 Our Story page

## Tech Stack

- **Frontend:** React 19, React Router
- **Styling:** CSS3
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **PDF Generation:** jsPDF

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5001
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── Components/      # Reusable components
│   ├── Navbar/
│   ├── Footer/
│   ├── FoodItem/
│   └── ...
├── pages/          # Page components
│   ├── Home/
│   ├── cart/
│   ├── PlaceOrder/
│   ├── Help/
│   └── ...
├── context/        # React Context (Global State)
├── assets/         # Images and static files
└── main.jsx        # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5001` |

## Features in Detail

### User Features
- Browse food menu by categories
- Add/remove items from cart
- Place orders with delivery details
- Track order status
- Download order invoices (PDF)
- Cancel orders (before confirmation)

### Pages
- **Home** - Hero section, menu, app download
- **Cart** - Shopping cart with promo codes
- **Place Order** - Checkout with delivery details
- **My Orders** - Order history and tracking
- **Help** - FAQs and support
- **Our Story** - About the company

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC

