# Internet-Application-Technologies

Set-up

  django-admin startproject webapp        // create Django project webapp
  python3 webapp/manage.py startapp api   // create api folder (inside env)
  python -m    // solve cors issue

How to install

  Virtual Environment
    pip install virtualenv                  // Install virtualenv
    virtualenv env                          // Create virtual environment (in: app/back-end/)
  
  Django Server
    pip install Django
    pip install djangorestframework
    pip install django-cors-headers         // Solves CORS problem
    pip install Pillow                      // Handles profile pictures
    pip install djangorestframework-simplejwt
 
  ReactJS app
    npm install                             // Install ReactJS packages (in: app/front-end/webapp/)
    npm install react-router-dom
    npm install axios
    npm install jwt-decode
    npm install google-maps-react

How to run
  
  Virtual Environment
    source env/bin/activate                 // Activate virtual environment (in: app/back-end/)
  
  Django Server
    python3 manage.py runserver             // Run Django server (in: app/back-end/)
  
  ReactJS app
    npm run dev                             // Run ReactJS app (in: app/front-end/webapp/)





Problems faced & fixed 

The SimpleJWT library works only on the primary User model. So instead of having a independent User model we had to extend the default User model and create an AbstractUser.

Authentication State Persistence




Resources Used
  Set-up : https://www.youtube.com/watch?v=tYKRAXIio28&t=11501s
  Custom User Model : https://www.youtube.com/watch?v=Ae7nc1EGv-A
  JWT : https://www.youtube.com/watch?v=xjMP0hspNLE&t=1s







listing{

  General Info
  
    listing_id unique
    Title string 50
    price (integer, in euro) float
    payment (month/night) string default month
    location string 50
    Region  Περιφέρεια
    Prefecture  Νομός
    City  Πόλη
    Neighborhood  Συνοικία
    street
    street_number
    postal_code
    surface (in sq meters) integer
    
    floor (basement, ground, 1/2/3...) string
      υπόγειο, ισόγειο, 1/2/3...
    type (διαμέρισμα, μεζονέτα, μονοκατοικία) string
    description textfield

    For month payment listings

      minimum reservation period  integer
      starting price  float
      extra price per guest float
      maximum guests  integer


  Photos  array of 8 imagefields
  Host CustomUser

  Map

    long  
    lat


  Space Info  integer

    beds  
    bedrooms
    kitchens
    bathrooms
    living room

  
  Provisions (Παροχές)  boolean

    Wifi
    heating
    cooling
    television
    parking
    elevator

  Rules boolean

    smoking
    pets
    parties


  Ratings

    number of ratings integer
    average rating  float
}