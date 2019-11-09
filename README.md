# LIRI BOT APP

This app uses node to take in parameters from APIs on the command line and return to the user information regarding songs, artists' concerts, and movies. The info is then printed into a text document

1. "concert-this" Provides concert info from the Bands in Town API
    - command : node liri.js concert-this "artist's name"  ### press enter ###
    - Information will then display in the terminal and be logged into the log.txt file
    - Not all artists have their information on this site. A message will tell the user this and nothing will be           logged to log.txt

2.  "movie-this" Provides concert info from the OMDB API
    - command : node liri.js movie-this "movie name"  ### press enter ###
    - The user will then see the movie information in the console as well as on the log.txt file. 
    - If the movie search is left blank, the user will recieve info for the movie, "Mr. Nobody".

3. "spotify-this-song" Provides concert info from the Spotify API
    - This uses Spotify's API to show information about a song the user searches. 
    - node liri.js spotify-this-song "song name" ### press enter ###
    - The user will then see information about the song in the console as well as on the log.txt file. 
    - If the song search is left blank, the user will get results for the Beatles song, "Strawberry Fields"

4. "do-what-it-says"
    - This application comes with a file called "random.txt".  Currently on this file is the text "movie-this,pulp         fiction".
    - command : node liri.js do-what-it-says ### press enter ###
      The information  for pulp fiction will then be displayed in the terminal and the log.txt document

5. Images from working node app
