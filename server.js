import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local'; 
import pkg from "pg";
import process from 'process';
import flash from 'connect-flash';




env.config();
const app = express();
app.set('port', process.env.PORT || 3000);
const saltRounds = 10;


app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.set("view engine", "ejs");




// Middleware to set error messages for login
app.use((req, res, next) => {

  // login errors
  res.locals.error = req.flash("error");

  // registration errors
  res.locals.userError = req.flash("userError");
  res.locals.emailError = req.flash("emailError");
  res.locals.passError = req.flash("passError");

  // success messages
  res.locals.success = req.flash("success");

  next();
});









// Database Connection
const { Pool } = pkg;

 const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err));







// Passport Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    (email, password, done) => {
      pool.query(
        "SELECT * FROM users WHERE email = $1",[email],
        (err, result) => {
          if (err) return done(err);

          // Check if user exists
          if (result.rows.length === 0) {
            return done(null, false, { message: "Invalid email or password." });
          }

          const user = result.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);

            if (!isMatch) {
              return done(null, false, { message: "Invalid email or password." });
            }

            return done(null, user);
          });
        } 
      );
    }
  )
);





  passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {  
            return done(err);
        }
        done(null, result.rows[0]);
    }
    );
});












// Routes



// Render login page
  app.get("/login", (req, res) => {
    res.render("login");
  });



  //render registration page
  app.get("/register", (req, res) => {
    res.render("register");
  });



  


  // Render ecommerce page (protected route)

  function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

  app.get("/ecommerce", ensureAuth, (req, res) => { 
    res.render("ecommerce");
  });























  // Handle registration POST request

  app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Username validation
  if (!username) {
    req.flash("userError", "Username is required");
    return res.redirect("/register");
  }

  // Email validation
  if (!email) {
    req.flash("emailError", "Email is required");
    return res.redirect("/register");
  }

  // Password validation
  if (!password) {
    req.flash("passError", "Password is required");
    return res.redirect("/register");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email format
  if (!emailRegex.test(email)) {
    req.flash("emailError", "Invalid email format");
    return res.redirect("/register");
  }



  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );


    // check if username already exists
    const userResult = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    if (userResult.rows.length > 0) {
      req.flash("userError", "Username already exists");
      return res.redirect("/register");
    }




    // Check if email already exists
    if (result.rows.length > 0) {
      req.flash("emailError", "Email already exists");
      return res.redirect("/register");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into the database
    await pool.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",
      [username, email, hashedPassword]
    );

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});








  

// Handle login POST request
  app.post("/login", passport.authenticate("local", {
    successRedirect: "/ecommerce",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Logged in successfully!"
  }));





// handle logout
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Logout failed. Please try again.");
        }
        res.redirect("/login");
    });
});







app.get("/smartphones", (req, res) => {
    res.render("smartphones");
});



























app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});