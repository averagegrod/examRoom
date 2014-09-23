<h1>ExamRoom</h1>
<h3>Now on Rails!</h3>

This is an application I built for tracking patient locations within our office. I followed Michael Hartl's awesome [Rails book](https://www.railstutorial.org/book) to port this project from PHP to Rails.

Feel free to download, try this out, and even build on it. You are ABSOLUTLY NOT allowed to sell this code without my explicit written permission. It is also NOT SECURE. DO NOT push this out on a public server or use the live demo for your own office. This will result in a complete breach of the HIPAA Privacy Rule. I run in it on a closed local network.

<h2>Instructions</h2>
`git clone` this repo
`rake db migrate`
`rails s`

Visit `localhost:3000/settings/show` to set up your Office. 
Set the number of patient rooms on the left.
Enter a name and Click Add to add Providers and Staff to your office. Click on a name to delete them. Once you've set this up visit `localhost:3000` to view your office.
The app will refresh itself every 30 seconds. You can change this on line 145 of `app\assets\javascripts\application.js` by editing the ms.

	var timer1 = setTimeout(refreshTable, 30000);

Enter a Patient's Name (or initials), select the MA, Provider, enter any comments pertaining to their visit, and click on the room number to save the room.

Click on the time for any room to clear that room.

View the [Live Demo](http://examroom.herokuapp.com/) or play with the [settings](http://examroom.herokuapp.com/settings/show). This is hosted free on [Heroku](https://www.heroku.com/) so it may take a minute to load up. 

This site will also store one local cookie to remember your theme which you can select by clicking on the small color buttons at the bottom. The Heroku demo may have some theme pop in.

<h3>Roadmap:</h3>

-Add the reload time to the settings page.
