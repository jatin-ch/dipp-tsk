Dipper Assignment

* ONLY FOR UBUNTU OS

1) Extract the folder in home dir.
  1.1) cut & paste the following in home dir.
       1.1.1) dipper folder
       1.1.2) router.js

 2) open terminal
   2.1) run router.js ($ nodemon router.js)
   2.2) open your browser : http://localhost:3000
      2.2.1) http://localhost:3000/request
      2.2.2) http://localhost:3000/request?connId=19&timeout=80

   In this way check for remaning.


  3) open another terminal
    31) go to dipper folder (command $cd dipper) & run the command $ nodemon server.js
    3.2)  open your browser : http://localhost:3000

If you browse : http://localhost:3000, it will show a message in terminal
 about how many servers are running at current time.
  If you close the tab  : http://localhost:3000, then again it will show disconnection message.
