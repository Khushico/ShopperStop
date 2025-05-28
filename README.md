🛒 ShopHub - Dynamic E-commerce Product Page
A modern, responsive e-commerce product page built with React that mimics Flipkart's design and functionality. Features real-time cart management, user authentication, and seamless shopping experience.

✨ Features
🎨 Interactive Product Display
Color Selection - Visual color swatches with hover preview

Size Options - Dynamic size selection with visual feedback

Image Preview - Real-time image updates based on color selection

Product Details - Pricing, ratings, and specifications

🛍️ Smart Cart Management
Add to Cart - Intelligent validation before adding items

Cart Page - Dedicated cart view with full CRUD operations

Quantity Control - Increase/decrease item quantities

Price Calculation - Real-time total and subtotal updates

Persistent Storage - Cart data preserved using localStorage

👤 User Authentication
Login System - Email-based authentication

User Profile - Display username extracted from email

Session Management - Logout functionality with dropdown

Cart Preservation - Maintains cart across login/logout

📱 Modern UX/UI
Flipkart-inspired Design - Authentic color scheme and typography

Responsive Layout - Mobile-first design approach

Interactive Popups - Validation and success notifications

Smooth Animations - Hover effects and transitions

🚀 Tech Stack
Frontend: React 18, React Router DOM

Styling: Custom CSS (Flipkart-inspired design)

State Management: React Hooks (useState, useEffect)

Storage: localStorage for cart persistence

Icons: SVG icons and emojis

🎯 Key Highlights
Zero Dependencies for UI components - Pure React implementation

Production Ready - Error handling and validation

SEO Friendly - Semantic HTML structure

Performance Optimized - Efficient state management

Cross-browser Compatible - Works on all modern browsers

🔧 Quick Start
bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
📁 Project Structure
text
src/
├── components/
│   ├── ProductPage.jsx    # Main product display
│   ├── CartPage.jsx       # Shopping cart page
│   └── Product.css        # Flipkart-style CSS
├── App.jsx                # Router configuration
└── main.jsx              # Entry point
🌟 Demo Features
Product Selection - Choose color and size

Cart Operations - Add, remove, update quantities

User Flow - Login to access full features

Responsive Design - Works on desktop and mobile

Data Persistence - Cart survives page refresh

Built with ❤️ using React | Inspired by Flipkart's UX
