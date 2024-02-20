# Rental template
This is a template for a website to showcase vacation rentals (holiday rentals, gites in French).
See [Demo](https://rental.remcode.net)
- add an unlimited number of images, these will be displayed as a gallery
- link an ics calendar to display availability from any of the major platforms (AirBnb, Booking, etc)

Made in React (vite) with TailwindCSS.

## CMS capabilities
Minimal CMS, allows text and images to be changes. No layout or other changes. Information is stored in JSON files that are edited using PHP scripts, there is no backend! This makes the site easily portable; just copy the files and you're done.

## Installation
To build:
```
npm run build
```
Copy files to your webhost that supports PHP, edit `php/password_config.php` and set its permissions to `0700`.
You can now log in by clicking the lock at the bottom of the page. Hover over any content to make changes.
