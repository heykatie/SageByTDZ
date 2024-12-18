## SAGE API Docs

![DB Schema](./db-schema/schema.png)

Base URL:** '/'

## All routes that require Authentication

All endpoints that require a user to be logged in

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

- Notifications
- Reviews
- Create Group
- User DashBoard
- Growth
-

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

## Get Current User

 - Require Auth: False

 - Request
    - Method: GET
    - Route Path: "/session"
    - Body: ?
 - Successful Response
    - status: 200
    - Headers
      - Content-Type: application/json --- *Sets to this when/if you are returning a JSON response using jsonify()

    - Body
    ```
      {
         "user": {
            id: 0
            username: 'VolunteerLyfe'
            email: 'green4lyfe@planet.com'
            firstName: 'Susan'
            lastName:'Markcul'
            birthday: 'November 16th, 1994'
            city: 'somecity'
            create_at:
            saved_filters:
            badge_id:
         }
      }

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": None
    }
    ```
### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * Route path: /session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "green4lyfe@planet.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "Susan",
        "lastName": "Markcul",
        "email": "green4lyfe@planet.com",
        "username": "Volunteer4Lyfe"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```
 ### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * Route path: /users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error response: User already exists with the specified email or username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists",
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

### Get all Events

Returns all the Events.

* Require Authentication: false
* Request
  * Method: GET
  * Route path: /events
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Events": [{

              "id": 1,
              "title": "help us",
              "description": "Helping people",
              "organizer_id": 1,
              "categories": ["Outdoor", "LGBT"],
              "address": "1233 do good st.",
              "'city'": "Great City",
              "state": "California",
              "event_date": "December 25, 2024",
              "created_at": "TimeStamp",
              "updated_at": "TimeStamp",
              "badge_id": 12,
              "review_id": [11, 10, 5],
              "status" : 1
        }
      ]
    }
    ```
### Get all Confirmed Events by the Current User

Returns all the events owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * Route path: /:UserId/events
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Events": [
        {
              "id": 1,
              "title": "help us",
              "description": "Helping people",
              "organizer_id": 1,
              "categories": ["Outdoor", "LGBT"],
              "address": "1233 do good st.",
              "'city'": "Great City",
              "state": "California",
              "event_date": "December 25, 2024",
              "created_at": "TimeStamp",
              "updated_at": "TimeStamp",
              "badge_id": 12,
              "review_id": [11, 10, 5],
              "status" : 1
        }
      ]
    }
    ```
### Get details of a Event from an id

Returns the details of a event specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * Route path: /events/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "title": "help us",
      "description": "Helping people",
      "organizer_id": 1,
      "categories": ["Outdoor", "LGBT"],
      "address": "1233 do good st.",
      "'city'": "Great City",
      "state": "California",
      "event_date": "December 25, 2024",
      "created_at": "TimeStamp",
      "updated_at": "TimeStamp",
      "badge_id": 12,
      "review_id": [11, 10, 5],
      "status" : 1,
      "EventImages": [
        {
          "id": 1,
          "url": "image url",
          "preview": true
        },
        {
          "id": 2,
          "url": "image url",
          "preview": false
        }
      ],
      "Organizer": {
        "id": 1,
        "description": "Some stuff about the Organizer",
        "logo": "URL",
        "link": "URL",
        "phone_number": 801-555-5555,
        "avgStarRating": 4.5,
        "numReviews": 5,
        "email": "someemail@someplace.org"
      }
    }
    ```

* Error response: Couldn't find a Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found"
    }
    ```

### Create an Invite

Creates and returns a new Invites.

* Require Authentication: true
* Request
  * Method: POST
  * Route path: /invites
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "friend_id": 2,
      "event_id": 1,
      "id": 1,
      "created_at": "timestamp",
      "status": 1
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "friend_id": 2,
      "event_id": 1,
      "id": 1,
      "created_at": "timestamp",
      "status": 1
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "friend_id": "Friend cannot be found",
        "event_id": "Event cannot be found",
      }
    }
    ```
### Edit a Invite

Updates and returns an existing Invite.

* Require Authentication: true
* Require proper authorization: Invite must belong to the current user
* Request
  * Method: PUT
  * Route path: /invites/:id/edit
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "friend_id": 2,
      "event_id": 1,
      "id": 1,
      "created_at": "timestamp",
      "status": 1
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "friend_id": 2,
      "event_id": 1,
      "id": 1,
      "created_at": "timestamp",
      "status": 1
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "You must be friends to invite user",
      "errors": {
        "friends_status": "Need to be friends"
      }
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invite couldn't be found"
    }
    ```
## Delete a Invite

Deletes an existing Invite.

* Require Authentication: true
* Require proper authorization: Invite must belong to the current user
* Request
  * Method: DELETE
  * Route path: /invites/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invite couldn't be found"
    }
    ```
## REVIEWS

### Get all Reviews of the Current User

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * Route path: /api/:userId/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "user_id": 1,
          "event_id": 1,
          "id": 1,
          "review": "some Review",
          "created_at": "timestamp",
          "updated_at": "timestamp" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
          "Event": {
            "id": 1,
            "title": "help us",
            "description": "Helping people",
            "organizer_id": 1,
            "categories": ["Outdoor", "LGBT"],
            "address": "1233 do good st.",
            "'city'": "Great City",
            "state": "California",
            "event_date": "December 25, 2024",
            "created_at": "TimeStamp",
            "updated_at": "TimeStamp",
            "badge_id": 12,
            "review_id": [11, 10, 5],
            "status" : 1,
            "preview_Img": "URL"
          },
        }
      ]
    }
    ```

### Get all Reviews by an Organizer's id

Returns all the reviews that belong to an Organizer specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * Route path: /reviews/:organizer_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "user_id": 1,
          "organizer_id": 1,
          "id": 1,
          "review": "some Review",
          "created_at": "timestamp",
          "updated_at": "timestamp" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
        }
      ]
    }
    ```

* Error response: Couldn't find a Organizer with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Organizer couldn't be found"
    }
    ```

### Create a Review for a Organizer based on the Organizer's id

Create and return a new review for a organizer specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * Route path: /organizers/:id/reviews
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome spot!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "organizer_id": 1,
      "review": "This was an awesome spot!",
      "stars": 5,
      "created_at": "2021-11-19 20:39:36",
      "updated_at": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Organizer with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Organizer couldn't be found"
    }
    ```

* Error response: Review from the current user already exists for the Organizer
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already has a review for this Organizer"
    }
    ```

### Edit a Review

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PATCH
  * Route path: /reviews/:id/edit
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome experience!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "organizer_id": 1,
      "review": "This was an awesome experience!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```
### Delete a Review

Delete an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * Route path: /reviews/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```
## Confirmed Events

### Get all of the Current User's Confirmed Events

Return all the Confirmed Events that the current user has made.

* Require Authentication: true
* Request
  * Method: GET
  * Route path: /:userId/confirm
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "ConfirmedEvents": [
        {
          "id": 1,
          "eventId": 1,
          "Event": {
            "id": 1,
            "title": "help us",
            "description": "Helping people",
            "organizer_id": 1,
            "categories": ["Outdoor", "LGBT"],
            "address": "1233 do good st.",
            "'city'": "Great City",
            "state": "California",
            "event_date": "December 25, 2024",
            "created_at": "TimeStamp",
            "updated_at": "TimeStamp",
            "badge_id": 12,
            "review_id": [11, 10, 5],
            "status" : 1,
            "preview_Img": "URL"
          },
          "userId": 2,
          "startTime": "2021-11-19",
          "endTime": "2021-11-20",
          "eventdate": "2021-11-19",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get all Attendees for a event based on the event's id

Return all the attendees for a event specified by id.

* Require Authentication: true
* Request
  * Method: GET
  * Route path: /confirm/:eventId
  * Body: none

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Attendees": [
        {
          "user_id": 1,
          "first_name": "Name",
          "last_name": "Lastname"
        }
      ]
    }
    ```

* Error response: Couldn't find a Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found"
    }
    ```
### Create a ConfirmedEvent for a Event based on the invite's id

Create and return a new ConfirmedEvent for a invites specified by id.

* Require Authentication: true
* Require proper authorization: you MUST be invited
* Request
  * Method: POST
  * Route path: /invites/:id/confirm
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "start_time": "08:00 AM",
      "end_time": "11:00 PM",
      "event_date": "2021-11-19",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "event_id": 1,
      "user_id": 2,
      "start_time": "08:00 AM",
      "end_time": "11:00 pm",
      "event_date": "2021-11-19",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "start_time": "start_time cannot be in the past",
        "end_time": "end_time cannot be on or before start_time",
        "event_date": "Event date cannot be before current date?"
      }
    }
    ```

* Error response: Couldn't find a Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found"
    }
    ```

* Error response: Attendee conflict
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Sorry, you have an event on these specified dates",
      "errors": {
        "start_time": "start_time cannot be in the past",
        "end_time": "end_time cannot be on or before start_time",
        "event_date": "Event date cannot be before current date?"
      }
    }
    ```
### Edit ConfirmedEvents

Update and return an existing ConfirmedEvents.

* Require Authentication: true
* Require proper authorization: ConfirmedEvents must belong to the current user
* Request
  * Method: PUT
  * Route path: /confirm/:id/edit
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "status": 1
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "invite_id": 1,
      "userId": 2,
      "status": 0,
      "start_time": "08:00 AM",
      "end_time": "11:00 pm",
      "event_date": "2021-11-19",
      "created_at": "2021-11-19 20:39:36",
      "updated_at": "2021-11-20 10:06:40"
    }
    ```

* Error response: Couldn't find a ConfirmedEvent with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Events couldn't be found"
    }
    ```

* Error response: Can't edit a ConfirmedEvent that's past the end date
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Past ConfirmedEvent can't be modified"
    }
    ```

* Error response: Attendee conflict
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Sorry, you have an event on these specified dates",
      "errors": {
        "ConfirmedEvent":{
          "id": 1,
          "start_time":" 08:00 AM ",
          "end_time": " 11:00 pm ",
          "event_date": "Have event on the same date."
        }
      }
    }
    ```
### Delete a ConfirmedEvent

Delete an existing ConfirmedEvent.

* Require Authentication: true
* Require proper authorization: ConfirmedEvent must belong to the current user
* Request
  * Method: DELETE
  * Route path: /confirm/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a ConfirmedEvent with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "ConfirmedEvent couldn't be found"
    }
    ```

* Error response: ConfirmedEvents that have been started can't be deleted
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Events that have been started can't be deleted"
    }
    ```

## Images


## Add Query Filters to Get All events

Return events filtered by query parameters.

* Require Authentication: false
* Request
  * Method: GET
  * Route path: /events/query
  * Query Parameters
    * page: integer, minimum: 1, default: 1
    * size: integer, minimum: 1, maximum: 20, default: 20
    * minLat: decimal, optional
    * maxLat: decimal, optional
    * minLng: decimal, optional
    * maxLng: decimal, optional
    * minPrice: decimal, optional, minimum: 0
    * maxPrice: decimal, optional, minimum: 0
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Spots": [
        {
          "id": 1,
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123,
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "avgRating": 4.5,
          "previewImage": "image url"
        }
      ],
      "page": 2,
      "size": 20
    }
    ```

* Error Response: Query parameter validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "page": "Page must be greater than or equal to 1",
        "size": "Size must be between 1 and 20",
        "maxLat": "Maximum latitude is invalid",
        "minLat": "Minimum latitude is invalid",
        "minLng": "Maximum longitude is invalid",
        "maxLng": "Minimum longitude is invalid",
        "minPrice": "Minimum price must be greater than or equal to 0",
        "maxPrice": "Maximum price must be greater than or equal to 0"
      }
    }
    ```

### Notifications

GET All Notifications

Return all the notifications for a user specified by id.

* Require Authentication: true
* Request
  * Method: GET
  * Route path: /notifications/:user_id
  * Body: none

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Notifications": [
        {
         "id": 2,
         "Invite": {
            "user_id": 1,
            "friend_id": 2,
            "event_id": 1,
            "id": 1,
         },
         "message": "Interesting information"
        }
      ]
    }
    ```

* Error response: Couldn't find a Event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "No notifications could be found"
    }
    ```

### Delete a Notification

Delete an existing Notification.

* Require Authentication: true
* Require proper authorization: Notification must belong to the current user
* Request
  * Method: DELETE
  * Route path: /notification/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Notification with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Notification couldn't be found"
    }
    ```
