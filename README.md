# Shreddit

[Shreddit](https://shreddit-aa.herokuapp.com) is based on the forum website [Reddit](https://reddit.com), with a snowboard/ski twist. Users can share their shredding experiences by creating posts that can have text or an image. Users can also vote and comment on posts. Votes either raise or lower the post's score, showing how good the post is, while comments are self-explanatory.

## Features

* Create an account, sign in, or demo the site via a Demo user log in.
* Create, Read, Update, and Delete
  * Posts
  * Comments
* Create, Read, and Delete
  * Votes

Upcoming features:
* Commenting on comments
* Voting on comments
* Sorting comments

## Technologies Used

* React
* Redux
* Flask SQLAlchemy
* PostgreSQL

# Splash Page

From the splash page, if you are logged in, you can click the "Start Shredding" button to navigate to the Posts page and start browsing all the posts on the site. If you are not logged in the "Start Shredding" button will navigate you to the Login page where you can login. Alternatively you can navigate to the Sign Up or Login pages by their respective buttons in the navbar in the top right.
![image](https://user-images.githubusercontent.com/92738445/159810062-15336641-6369-4b4b-90de-277f94f33980.png)

# Posts

On the Posts page you can see all the posts on the site. You can use the "Top", "New", and "Old" buttons to sort the posts. You can vote on any post by clicking the small Snowboard to the left of the post preview to increase its score by 1, or clicking the skis to decrease its score by 1. If you created the post, you can also edit or delete the post using the buttons under that post's title. Clicking the title of a post will navigate you to that post's page. You can also navigate to the form to create your own post using the "Create a Post" button on the right.
![image](https://user-images.githubusercontent.com/92738445/163457421-9ee5d8f1-7b17-42d9-8266-0a6123e18bda.png)

# Post

On the individual post page you can see the full body of the post's text, or a larger version of the post's image. Clicking on the image will open a new tab to the image's external link. On this page you can also edit or delete the post, if you created it. The "Create a Post" button functions the same on this page. The comment form is permanently shown, where you can type a comment and submit it with the "Submit Comment" button. If you have any comments on this post's page you can edit or delete the comment with buttons in the comment's container.
![image](https://user-images.githubusercontent.com/92738445/163457298-9c25c924-330f-4178-b6c4-ce9404c58ba0.png)

edit post
![image](https://user-images.githubusercontent.com/92738445/159811764-f5953eb0-424d-4ab7-ad8b-565a4bf71514.png)

delete post
![image](https://user-images.githubusercontent.com/92738445/159811815-58b54bfd-247a-478b-b08c-a08af165492b.png)

edit comment
![image](https://user-images.githubusercontent.com/92738445/159811678-c9dcecbf-5b14-4f4e-aa41-ab77c72feecd.png)

# Create Post

You can either create a text post or an image post. Images must be hosted externally and can have .jpg, .jpeg, .png, or .gif extensions.

create text post
![image](https://user-images.githubusercontent.com/92738445/159811916-7310f306-d1d1-4d8b-afe7-fff353aa84f9.png)

create image post
![image](https://user-images.githubusercontent.com/92738445/159811978-36e0d16f-392f-4c35-ba10-18523a184a96.png)

# Comments
You can comment on the post itself, or on other comments. Comments can be chained up to 5 comments deep. You can also vote on comments just like you can with Posts
![image](https://user-images.githubusercontent.com/92738445/163457800-2c4de47e-dd92-4f17-b777-0df6b52e2241.png)
