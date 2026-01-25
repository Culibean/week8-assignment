## User Stories

🐿️ As a user, I want to view all posts with options to sort them in ascending or descending order so that I can easily find content based on my preferences. ✅
🐿️ As a developer, I want to design a SQL schema that includes a posts table and a comments table, ensuring that comments are correctly associated with the corresponding post ID. ✅
🐿️ As a user, I want to be able to delete posts using a delete button on each post’s page so that I can manage or remove my content from the database. ✅
🐿️ As a user, I want to add comments on individual posts using a user-friendly form. ✅
🐿️ As a user, I want to comment on posts directly on their dedicated pages so that my interactions are contextually tied to the content I view. ✅
🐿️ As a user, I want to be automatically redirected to the posts page after creating a new post so I can immediately see my content in the context of all posts. ✅

## Requirements

🎯 Display all posts on the page, with an option to sort them in ascending or descending order. ✅
🎯 Create a SQL schema for a posts table and a comments table, with the comments being connected to the posts table with a foreign key. ✅
Please submit your database schema, as is mentioned in the submission instructions.
🎯 Create a delete button on posts that allows users to delete the post from the database. ✅
🎯 Create a form which saves comments to a dedicated comments table, with the comments being connected to the posts table with a foreign key. ✅
🎯 Allow users to comment on individual posts in their dynamic routes. Comments should be associated with posts, and have a dynamic route (e.g. /posts/:postid). ✅
🎯 Add a redirect when a user creates a post to redirect them to the posts page. ✅

## Stretch User Stories

🐿️ As a user, I want to categorise my posts during creation so that I can organise my posts and browse other posts by category.
🐿️ As a user, I want to edit my posts on a dedicated route so that I can easily modify my posts.
🐿️ As a user, I want to edit my comments on a dedicated route so that I can revise my feedback.

## Stretch Requirements

🏹 Implement a select input (or similar mechanism) that allows users to categorise posts during creation, storing them in their own table in the database. Ensure appropriate routing for categories, with endpoints such as /categories and /categories/:id to enable users to browse and interact with posts by category.
🏹 Create an edit functionality accessible via /posts/:id/edit, which pre-fills a form for post data. Create a working PUT route to update the post in the database.
🏹 Develop an edit comment feature accessible via /posts/:id/comments/:id/edit, which pre-fills a form for comment data. Create a working PUT route to update the comment in the database.

# Reflection

After last week, I made sure I fully focused on the requirements first rather than trying to include too much. I decided to build on last weeks project and develop a potential communtiy board for Uncluttr. Users are able to add in new submissions and comment and like existing pages. I decided to include the option to add yourself to the user database. Initially I wanted the option for users to filter for their own posts but adding their username, but I have run out of time to fully research and see how tobuild this in Next.js.

Overall I believe I fulfilled all the requirements. I didn't try any stretchgoals this this time as I wanted to make sure the basics were working.

I had two main difficulties this week and it'd be great to get some feedback on how to improve.

## Database

I still sometimes struggle fully understanding the foreign key and join actions within PostgreSQL and when to use what. I believe I managed it with the forein key this time and the data connects (comments with post and reactions). I feel like at this points it's a practice thing and the individual queries have to become muscle memory. But I noticed that I get easily confused with databases and their connections.

## Reaction and Sorting Function

These two functions took me the longest. It was easier once I set them up as components to be added to the individual post page. But I noticed with Next.js I find it really hard to keep an oversight to what is server and what is client. I much preferred react with express to keep things separate and call them when needed. The main issue with the sorting was that i sorted by date which was saved as a local string (initially a timestamp in the database) which then the sort function didn't recognise. I got it working in the end but would appreciate some feedback if it this is correct? I added the category sort as a backup and followed the template given in the workshops/demos.

## Planning

https://www.figma.com/board/Ko6dRMHSs7gKGGESgY0Mvj/Uncluttr-v2?node-id=0-1&t=YJHBnyKwXnKidky8-1

## Resources

Counter connected to SQL:
https://www.postgresql.org/docs/current/functions-aggregate.html

Forms:

https://nextjs.org/docs/app/guides/forms

Date and Time:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

Sorting:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
