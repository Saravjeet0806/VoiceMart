# 🛒 Smart Shopping List App

A modern, feature-rich shopping list application built with React and Node.js that includes voice commands, price tracking, and intelligent suggestions.

## ✨ Features

- **📝 Smart Shopping Lists**: Add, edit, and delete items with quantities and prices
- **🎤 Voice Commands**: Add and remove items using voice control
- **💰 Price Tracking**: Browse items with real-time pricing from your menu
- **🔍 Advanced Filtering**: Filter items by category, price range, and search terms
- **💡 Smart Suggestions**: Get personalized item recommendations
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🌙 Modern UI**: Clean, intuitive interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saravjeet0806/VoiceMart.git
   cd smart-shopping-list
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5001
   MONGODB_URI= your uri eg. mongodb+srv://username:password@cluster.mongodb.net/shopping-list
   ```

5. **Start the application**
   
   Backend (from backend directory):
   ```bash
   npm run dev
   ```
   
   Frontend (from frontend directory):
   ```bash
   npm run dev
   ```

6. **Access the app**
   
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Architecture

### Frontend (React)
```
src/
├── components/
│   ├── Navbar.js          # Navigation bar
│   ├── ShoppingList.js    # Main shopping list view
│   ├── Menu.js            # Browse & add items from menu
│   ├── Suggestions.js     # Smart suggestions
│   └── VoiceControl.js    # Voice command interface
├── hooks/
│   └── useVoiceCommands.js # Voice processing logic
├── services/
│   └── api.js             # API communication
└── App.js                 # Main application component
```

### Backend (Node.js/Express)
```
├── config/
│   └── db.js              # Database connection
├── models/
│   ├── Item.js            # Shopping list item model
│   ├── Suggestion.js      # Suggestion model
│   └── Price.js           # Price tracking model
├── routes/
│   ├── itemRoutes.js      # Shopping list CRUD operations
│   ├── suggestionRoutes.js # Suggestions API
│   └── priceRoutes.js     # Price data API
└── server.js              # Express server setup
```

## 🎯 Key Features Explained

### Voice Commands
The app supports natural voice commands:
- "Add 5 apples to my list"
- "Remove milk from list"
- "Delete bananas"

### Smart Menu System
- **Category Filtering**: Filter by fruits, vegetables, dairy, bakery
- **Price Range**: Set minimum and maximum price limits
- **Search**: Find items quickly by name
- **Quantity Selection**: Choose exact quantities before adding

### Price Tracking
- Real-time price data for all menu items
- Automatic total calculation
- Unit price display (per kg, per liter, etc.)

## 🛠️ Tech Stack

**Frontend:**
- React 18+ with Hooks
- CSS3 with Flexbox/Grid
- Web Speech API for voice recognition
- Responsive design principles

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- RESTful API architecture
- CORS enabled for cross-origin requests

**Database:**
- MongoDB for data persistence
- Collections: items, suggestions, prices

## 📡 API Endpoints

### Shopping List Items
- `GET /api/items` - Get all items
- `POST /api/items` - Add new item
- `DELETE /api/items/:id` - Delete item

### Suggestions
- `GET /api/suggestions` - Get all suggestions
- `POST /api/suggestions` - Add new suggestion

### Prices
- `GET /api/prices` - Get all price data

## 🎨 UI/UX Features

- **Tab-based Navigation**: Easy switching between List, Menu, and Suggestions
- **Fixed Voice Control Bar**: Always accessible at the bottom
- **Error Handling**: User-friendly error messages with dismissible alerts
- **Loading States**: Smooth user experience during API calls
- **Mobile-First Design**: Optimized for mobile devices

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run test suite
```

**Backend:**
```bash
npm run dev        # Start with nodemon
npm start          # Start production server
```

### Adding New Features

1. **New API Endpoint**: Add route in `routes/` directory
2. **New Component**: Create in `components/` directory
3. **Database Model**: Add to `models/` directory
4. **Voice Command**: Update `useVoiceCommands.js` hook

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Web Speech API for voice recognition
- MongoDB for flexible data storage
- React community for excellent documentation
- Express.js for robust backend framework

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/yourusername/smart-shopping-list/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

---

**Made with ❤️ for smarter shopping experiences**
