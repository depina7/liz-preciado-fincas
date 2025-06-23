const express = require('express');
const path = require('path');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure database directory exists
if (!fs.existsSync('./database')) {
  fs.mkdirSync('./database');
}

// Database setup
const db = new sqlite3.Database('./database/fincas.db');

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    price DECIMAL(10,2),
    image_url TEXT,
    amenities TEXT,
    bedrooms INTEGER,
    bathrooms INTEGER,
    area DECIMAL(10,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    property_interest TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert sample data if tables are empty
  db.get('SELECT COUNT(*) as count FROM properties', (err, row) => {
    if (row && row.count === 0) {
      const sampleProperties = [
        {
          title: 'Villa Esperanza Premium',
          description: 'Spectacular luxury finca with panoramic mountain views, infinity pool, and modern amenities. Perfect for exclusive retreats and events.',
          location: 'Guarne, Antioquia',
          price: 850000,
          amenities: 'Infinity Pool, Jacuzzi, BBQ Area, Mountain Views, Wi-Fi, Full Kitchen',
          bedrooms: 6,
          bathrooms: 4,
          area: 350.5
        },
        {
          title: 'Casa del Valle Deluxe',
          description: 'Authentic Colombian finca with modern luxury touches. Surrounded by lush gardens and offering complete privacy.',
          location: 'Rionegro, Antioquia',
          price: 650000,
          amenities: 'Private Garden, Pool, Fireplace, Gourmet Kitchen, Parking',
          bedrooms: 4,
          bathrooms: 3,
          area: 280.0
        },
        {
          title: 'Finca Las Flores Elite',
          description: 'Eco-luxury finca with sustainable features and breathtaking natural surroundings. Ideal for nature lovers.',
          location: 'Santa Elena, Medellín',
          price: 750000,
          amenities: 'Eco-Pool, Hiking Trails, Organic Garden, Solar Power, Spa Area',
          bedrooms: 5,
          bathrooms: 3,
          area: 400.0
        }
      ];

      sampleProperties.forEach(property => {
        db.run(`INSERT INTO properties (title, description, location, price, amenities, bedrooms, bathrooms, area) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [property.title, property.description, property.location, property.price, 
                 property.amenities, property.bedrooms, property.bathrooms, property.area]);
      });
    }
  });
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Routes
app.get('/', (req, res) => {
  db.all('SELECT * FROM properties ORDER BY created_at DESC LIMIT 6', (err, properties) => {
    if (err) {
      console.error(err);
      properties = [];
    }
    res.render('index', { properties, title: 'Luxury Colombian Fincas' });
  });
});

app.get('/contact', (req, res) => {
  const success = req.query.success;
  res.render('contact', { title: 'Contact Us', success });
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, phone, message, property_interest } = req.body;
  
  db.run('INSERT INTO contacts (name, email, phone, message, property_interest) VALUES (?, ?, ?, ?, ?)', 
    [name, email, phone || null, message, property_interest || null], 
    function(err) {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving contact information');
      } else {
        res.redirect('/contact?success=1');
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Liz Preciado's Fincas website running on http://localhost:${PORT}`);
  console.log(`📱 Visit http://localhost:${PORT} to see your website`);
});