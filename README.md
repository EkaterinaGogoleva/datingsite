# Datingsite

## About App

This project is a simple dating app.
It allows the user to register by clicking on the "Sign Up" button. To register, you need to fill in the form.
The form has a validator that allows you to use a password of at least 6 characters, the nickname must be from 3 to 20 characters, the email must be written in a specific form. If the validation requirements are not met, the user is notified of this, and registration is performed only after the correct filling of the form.

A registered user can log in to the app by clicking on the "LogIn" button. After authorization, "Me" and "Profile" tabs becomes available to the user. In "Me" tab, user can see the data entered by him during registration. The user can edit this data and completely delete his profile.

The "Profiles" page contains a list of all registered users (their nicknames). By clicking on the desired nickname, the user receives all available information about the person (except for the name and password). On the "Profiles" page, you can reactively search for users by nickname, and it is enough to enter only a part of the nickname.

registered user can loged out

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
  
  ## Bootstrap
  The project uses styles Bootstrap

  ## Mobile support
  The WebApp is compatible with devices of all sizes.
  
  ## PWA
 This WebApp is a progressive Web App 