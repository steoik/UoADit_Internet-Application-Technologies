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
 
  ReactJS app
    npm install                             // Install ReactJS packages (in: app/front-end/webapp/)
    npm install react-router-dom
    npm install axios

How to run
  
  Virtual Environment
    source env/bin/activate                 // Activate virtual environment (in: app/back-end/)
  
  Django Server
    python3 manage.py runserver             // Run Django server (in: app/back-end/)
  
  ReactJS app
    npm run dev                             // Run ReactJS app (in: app/front-end/webapp/)
