## SAGE API Docs

![DB Schema](./db-schema/schema.png)

* Base URL: `/api`

## All routes that require Authentication

All endpoints that require a user to be logged in:
- Notifications
- Feedback
- Create Events
- User DashBoard
- Growth -- Bonus
All endpoints that require a current user to be logged in.

* **Request**: endpoints that require authentication
* **Error Response**: Require authentication
  * **Status Code**: 401
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Authentication required"
    }
    ```

* **Request**: Endpoints that require proper authorization
* **Error Response**: Require proper authorization
  * **Status Code**: 403
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

## Get Current User

 - **Require Auth**: False

 - **Request**:
    - **Method**: GET
    - Route Path: "/session"
    - **Body**: none
 - **Successful Response**:
    - status: 200
    - Headers
      - Content-Type: application/json ## Messages

      ### Create a Message

      ###  *Sets to this when/if you are returning a JSON response using jsonify()

    - **Body**:
    ```json
      {
         "user": {
            "id": 0,
            "username": "VolunteerLyfe",
            "email": "green4lyfe@planet.com",
            "firstName": "Susan",
            "lastName":"Markcul",
            "address": "1322 Money Dr",
            "city": "someCity",
            "state": "someState",
            "organizer": "true",
            "description": "Description of organizer",
            "phoneNumber": 801-555-5555,
            "logo": "logo url",
            "link": "site url",
            /*
            PREFERENCES COMING SOON
            "savedFilters":["Filter1", "Filter2"],
            */
            "Badges": [1, 3, 22]
         }
      }

* **Successful Response**:when there is no logged in user.
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "user": "Null"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* **Require Authentication**: false
* **Request**
  * **Method**: POST
  * **Route path**: `/session`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "credential": "green4lyfe@planet.com",
      "password": "secret password"
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "Susan",
        "lastName": "Markcul",
        "email": "green4lyfe@planet.com",
        "username": "Volunteer4Lyfe",
        "city": "someCity",
        "state": "someState",
        "organizer": "true",
        "description": "Description of organizer",
        "phoneNumber": 801-555-5555,
        "logo": "logo url",
        "link": "site url",
        "Badges": [1, 3, 22],
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
    }
    ```

* **Error Response**: Invalid credentials
  * **Status Code**: 401
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* **Error response**: Body validation errors
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required",
        "city": "City is required",
        "state": "State is required",
      }
    }
    ```
 ### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* **Require Authentication**: false
* **Request**
  * **Method**: POST
  * **Route path**: `/users`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password",
      "address": "1322 Money Dr",
      "city": "someCity",
      "state": "someState",
      "organizer": "True",
      "description": "Description of organizer",
      "phoneNumber": 801-555-5555,
      "link": "site url",
      "logo": "logo url"
    }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "city": "someCity",
        "state": "someState",
        "organizer": "True",
        "description": "Description of organizer",
        "phoneNumber": 801-555-5555,
        "link": "site url",
        "logo": "logo url",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
    }
    ```

* **Error response**: User already exists with the specified email or username
  * **Status Code**: 500
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists",
        "username": "User with that username already exists"
      }
    }
    ```

* **Error response**: Body validation errors
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "city": "City is required",
        "state": "State is required"
      }
    }
    ```

## Events

### Get all Events

Returns all the Events.

* **Require Authentication**: false
* **Request**
  * **Method**: GET
  * **Route path**: `/events`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Events": [
        {
          "id": 1,
          "title": "Help Us",
          "description": "Helping people",
          "organizerId": 2,
          "categories": ["Outdoor", "LGBT"],
          "address": "1233 Do Good St.",
          "city": "Great City",
          "state": "California",
          "eventDate": "December 25, 2024",
          "startTime": "9:00:00 EST",
          "endTime": "13:30:00 EST",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "badgeId": 12,
          "badgeUrl": "photo url",
          "status" : 1
        }
      ]
    }
    ```
### View User Events from Dashboard

Returns all event invites and RSVPs of the current user.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/profile/events`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Events": [
        {
          "id": 1,
          "title": "Help Us",
          "description": "Helping people",
          "categories": ["Outdoor", "LGBT"],
          "address": "1233 Do Good St.",
          "city": "Great City",
          "state": "California",
          "eventDate": "December 25, 2024",
          "startTime": "9:00:00 EST",
          "endTime": "13:30:00 EST",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "badgeId": 12,
          "status" : 1
        }
      ]
    }
    ```
### Get details of a Event from an id

Returns the details of a event specified by its id.

* **Require Authentication**: false
* **Request**
  * **Method**: GET
  * **Route path**: `/events/:eventId`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "id": 1,
      "title": "Help Us",
      "description": "Helping people",
      "categories": ["Outdoor", "LGBT"],
      "address": "1233 Do Good St.",
      "city": "Great City",
      "state": "California",
      "eventDate": "December 25, 2024",
      "startTime": "9:00:00 EST",
      "endTime": "13:30:00 EST",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "badgeId": 12,
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
        "name": "the Organizer",
        "logo": "URL",
        "link": "URL",
        "phoneNumber": 801-555-5555,
        "email": "someemail@someplace.org"
      }
    }
    ```

* **Error response**: Couldn't find a Event with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Event couldn't be found"
    }
    ```

### **Create an Event**

Creates a new Event and returns the newly created Event's information.

* **Require Authentication**: true
* **Request**
  * **Method**: POST
  * **Route path**: `/events`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
        {
          "title": "Help Us",
          "description": "Helping people",
          "categories": ["Outdoor", "LGBT"],
          "address": "1233 Do Good St.",
          "city": "Great City",
          "state": "California",
          "eventDate": "December 25, 2024",
          "startTime": "9:00:00 EST",
          "endTime": "13:30:00 EST",
          "badgeUrl": "photo url",
          "eventImages": ["image url"]
        },
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "id": 1,
      "title": "Help Us",
      "description": "Helping people",
      "categories": ["Outdoor", "LGBT"],
      "address": "1233 Do Good St.",
      "city": "Great City",
      "state": "California",
      "eventDate": "December 25, 2024",
      "startTime": "9:00:00 EST",
      "endTime": "13:30:00 EST",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "badgeId": 12,
      "badgeUrl": "image url",
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
       "organizerId": 2
    }
    ```

* **Error Response**: Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Title is required",
        "description": "Description is required",
        "address": "Address is required.",
        "city": "City is required",
        "state": "State is required",
        "eventDate": "Date is required",
        "startTime": "Start time is required",
        "endTime": "13:30:00 EST",
      }
    }
    ```

### **Edit an Event**

Edits an event if user is organizer of event.

* **Require Authentication**: true
* **Require Authorization**: User must be organizer of event to make edits
* **Request**
  * **Method**: PUT
  * **Route path**: `/events/:eventId`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
        {
          "title": "Help Us Help You",
          "description": "Helping people",
          "categories": ["Outdoor", "LGBT"],
          "address": "420 Disney Ln",
          "city": "Los Angeles",
          "state": "California",
          "eventDate": "December 26, 2024",
          "startTime": "9:00:00 EST",
          "endTime": "13:30:00 EST",
          "badgeUrl": "photo url",
          "eventImages": ["image url"]
        },
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "id": 1,
      "title": "Help Us Help You",
      "description": "Helping people",
      "categories": ["Outdoor", "LGBT"],
      "address": "420 Disney Ln",
      "city": "Los Angeles",
      "state": "California",
      "eventDate": "December 26, 2024",
      "startTime": "9:00:00 EST",
      "endTime": "13:30:00 EST",
      "updatedAt": "2021-11-19 20:39:36",
      "badgeId": 12,
      "badgeUrl": "image url",
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
       "organizerId": 2
    }
    ```

* **Error Response**: **Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Title is required",
        "description": "Description is required",
        "address": "Address is required.",
        "city": "City is required",
        "state": "State is required",
        "eventDate": "Date is required",
        "startTime": "Start time is required",
        "endTime": "13:30:00 EST",
      }
    }
    ```

### **Delete an Event**

Deletes an Event. Only the creator of the Event is allowed to delete it.

* **Require Authentication**: true
* **Require Authorization**: User must be the creator of the Event
* **Request**
  * **Method**: DELETE
  * **Route path**: `/events/:eventId`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Successfully deleted event"
    }
    ```

* **Error Response**: Group not found**
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Group not found"
    }
    ```

* **Error Response**: User not authorized**
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden"
    }
    ```

## Messages

### View all Group Messages

Return all the Messages associated with an Event

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/groups/:groupId/messages`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Messages": [
        {
          "id": 1,
          "creatorId": 2,
          "message": "Message text"
        },
        {
          "id": 2,
          "creatorId": 4,
          "message": "Message text"
        },
        {
          "id": 3,
          "creatorId": 1,
          "message": "Message text"
        }
      ]
    }
    ```
* **Error response**: Couldn't find any Messages with the specified Event id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No messages found"
    }
    ```

### Create a Group Message

Creates Message for an Event and returns the newly created Message's information.

* **Require Authentication**: true
* **Require Authorization**: User must not be organizer of Event, must have RSVPd 'yes' to event
* **Request**
  * **Method**: POST
  * **Route path**: `/groups/:groupId/messages`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "message": "Looking forward to the event!"
      }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "id": 1,
      "eventId": 2,
      "creatorId": 2,
      "message": "Looking forward to the event!"
    }
    ```

* **Error Response**: **Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "message": "Message cannot be blank",
      }
    }
    ```

* **Error Response**: User is event Organizer or has not RSVPd to event
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden",
    }
    ```

### Edit a Group Message on Event Page

Edits Message on Event page if user is creator.

* **Require Authentication**: true
* **Require Authorization**: User must be creator of Message to make edits
* **Request**
  * **Method**: PUT
  * **Route path**: `/groups/:groupId/messages/:messageId`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "message": "What landmarks should I look for at the event meeting spot?"
      },
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "id": 3,
      "eventId": 1,
      "creatorId": 2,
      "message": "What landmarks should I look for at the event meeting spot?"
    }
    ```

* **Error Response**: **Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "message": "Message cannot be blank"
      }
    }
    ```

* **Error Response**: Message does not belong to user
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden",
    }
    ```
* **Error Response**: Message not found
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Message not found",
    }
    ```

### Delete a Group Message

Removes a Group Message

* **Require Authentication**: true
* **Require Authorization**: Message must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: `/groups/:groupId/messages/:messageId`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "messageId": 2,
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Message removed seccessfully"
    }
    ```

* **Error Response**: Message does not belong to user
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

* **Error response**: Couldn't find a Message with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```

## RSVPs

### Get all of the Current User's RSVPs

Return all the RSVPs that the current user has made.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/rsvps`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "RSVPs": [
        {
          "id": 1,
          "eventId": 1,
          "Event": {
            "id": 1,
            "title": "Help Us",
            "description": "Helping people",
            "organizerId": 1,
            "categories": ["Outdoor", "LGBT"],
            "address": "1233 Do Good St.",
            "city": "Great City",
            "state": "California",
            "eventDate": "December 25, 2024",
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36",
            "badgeId": 12,
            "reviewId": [11, 10, 5],
            "status" : 1,
            "previewImg": "URL"
          },
          "userId": 2,
          "startTime": "2021-11-19",
          "endTime": "2021-11-20",
          "eventDate": "2021-11-19",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

* **Error response**: Couldn't find any RSVPs for current user
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No RSVPs found"
    }
    ```


### Get all Event RSVPs based on the Event's id

Return all the RSVPs for a Event specified by id (these will be the event groups)

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/events/:eventId/rsvps`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "RSVPs": [
        {
            "id": 0,
            "username": "VolunteerLyfe",
            "email": "green4lyfe@planet.com",
            "firstName": "Susan",
            "lastName":"Markcul",
            "city": "somecity",
            "Badges": [1, 3, 22]
         },
        {
            "id": 3,
            "username": "VolunteerLyfe1",
            "email": "gre3en4lyfe@planet.com",
            "firstName": "Suz",
            "lastName":"Mark",
            "birthday": "November 16th, 1993",
            "city": "somewherecity",
            "Badges": [1, 3, 22]
        }
      ]
    }
    ```

* **Error response**: Couldn't find a Event with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Event couldn't be found"
    }
    ```



## **Friends**

### **Get All Friends of the Current User**

Returns a list of all the current user's friends. Users who have attended the same event together before will automatically be considered friends.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/friends`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "Friends": [
        {
          "id": 1,
          "firstName": "John",
          "username": "johndoe",
          "profileImageUrl": "https://image-url.com/profile1.jpg"
        },
        {
          "id": 2,
          "firstName": "Jane",
          "username": "janesmith",
          "profileImageUrl": "https://image-url.com/profile2.jpg"
        }
      ]
    }
    ```

* **Error Response**: No friends found**
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "No friends found"
    }
    ```

### **Get Limited Details of a Specific Friend**

Returns limited information about a specific friend, including their first name, username, profile image, and a list of past events attended together.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/friends/:friendId`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "Friend": {
        "firstName": "John",
        "username": "johndoe",
        "profileImageUrl": "https://image-url.com/profile1.jpg",
        "eventsAttendedTogether": [
          {
            "eventId": 1,
            "eventName": "Beach Cleanup",
            "eventDate": "2024-12-01"
          },
          {
            "eventId": 2,
            "eventName": "Food Bank Volunteering",
            "eventDate": "2024-11-15"
          }
        ]
      }
    }
    ```

* **Error Response**: Friend not found**
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Friend not found"
    }
    ```

### Create a Friend Request

Invites a member of an event group to become a personal friend.

* **Require Authentication**: true
* **Request**
  * **Method**: POST
  * **Route path**: `events/:eventId/rsvps`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "id": 1,
      "sendingUserId": 1,
      "receivingUserId": 2,
      "eventId": 1
    }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "id": 1,
      "sendingUserId": 1,
      "receivingUserId": 2,
      "eventId": 1,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "accepted": 0
    }
    ```

* **Error Response**: Body validation errors
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "friendId": "Friend cannot be found",
        "eventId": "Event cannot be found",
      }
    }
    ```
### Remove a Friend Request

Removes a sent friend request

* **Require Authentication**: true
* **Require Authorization**: Request must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: `/events/:eventId/rsvps`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "receivingUserId": 2,
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Request removed seccessfully"
    }
    ```

* **Error Response**: Request does not belong to user
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

* **Error response**: Couldn't find a Request with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Request couldn't be found"
    }
    ```

## Requests

### Create a Request

Send a request to another user.

* **Require Authentication**: true
* **Request**
  * **Method**: POST
  * **Route path**: `/api/requests`
  * **Body**:

    ```json
    {
      "sender_id": 1,
      "receiver_id": 2
    }
    ```

* **Successful Response**:
  * **Status Code**: 201
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "id": 10,
      "sender_id": 1,
      "receiver_id": 2,
      "created_at": "2024-12-30T18:00:00Z",
      "accepted": null
    }
    ```

* **Error Response**: Invalid or missing data
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Invalid request data"
    }
    ```

---

### View Requests

Retrieve all requests for the authenticated user.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/api/requests`
  * **Query Parameters**:
    * `type` (optional): `sent` or `received`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Requests": [
        {
          "id": 10,
          "sender_id": 1,
          "receiver_id": 2,
          "created_at": "2024-12-30T18:00:00Z",
          "accepted": null
        }
      ]
    }
    ```

* **Error Response**: Invalid query parameters
  * **Status Code**: 400
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Invalid query parameters"
    }
    ```

---

### Respond to a Request

Accept or reject a request.

* **Require Authentication**: true
* **Request**
  * **Method**: PUT
  * **Route path**: `/api/requests/:id`
  * **Body**:

    ```json
    {
      "accepted": true
    }
    ```

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "id": 10,
      "sender_id": 1,
      "receiver_id": 2,
      "created_at": "2024-12-30T18:00:00Z",
      "accepted": true
    }
    ```

* **Error Response**: Request not found
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Request not found"
    }
    ```

---

### Delete a Request

Cancel a sent request or remove a received request.

* **Require Authentication**: true
* **Request**
  * **Method**: DELETE
  * **Route path**: `/api/requests/:id`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 204
  * **Headers**: none
  * **Body**: none

* **Error Response**: Request not found
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Request not found"
    }
    ```

## Feedback

### View Feedback

Return all the Feedback for a Organizer

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/profile/feedback`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Feedback": [
        {
          "id": 0,
          "userId": 4,
          "reaction": ":)",
          "message": "Well organized event",
        },
        {
          "id": 0,
          "userId": 4,
          "reaction": ":|",
          "message": "Event started late, nowhere to sit",
        }
      ]
    }
    ```

* **Error response**: Couldn't find Feedback associated with Organizer
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No feedback found"
    }
    ```

### View Feedback based on Event id

Return all the Feedback for a Event based on id

* **Require Authentication**: true
* **Require Authorization**: User must be Organizer of Event
* **Request**
  * **Method**: GET
  * **Route path**: `/events/:eventId/feedback`
  * **Body**: none

* **Successful Response**:
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "Feedback": [
        {
          "id": 0,
          "userId": 4,
          "reaction": ":)",
          "message": "Well organized event",
        },
        {
          "id": 0,
          "userId": 4,
          "reaction": ":|",
          "message": "Event started late, nowhere to sit",
        }
      ]
    }
    ```

* **Error response**: Couldn't find a Feedback associated with Event
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "No feedback found"
    }
    ```

### Create Feedback

Creates Feedback for an Event and returns the newly created Feedback's information.

* **Require Authentication**: true
* **Require Authorization**: User must not be organizer of Event, must have earned Event Badge, and must not have left previous feedback
* **Request**
  * **Method**: POST
  * **Route path**: `/events/:eventId/feedback`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "reaction": ";)",
        "message": "Had a great time"
      }
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "id": 1,
      "eventId": 2,
      "reaction": ";)",
      "message": "Had a great time"
    }
    ```

* **Error Response**: **Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "reaction": "Please select a reaction",
        "message": "Message cannot be blank",
      }
    }
    ```

* **Error Response**: Feedback does not belong to user
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden",
    }
    ```

### Edit Feedback

Edits Feedback if user is creator.

* **Require Authentication**: true
* **Require Authorization**: User must be creator of feeback to make edits
* **Request**
  * **Method**: PUT
  * **Route path**: `/events/:eventId/feedback/:feedbackId` OR `/profile/feedback/:feedbackId`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
      {
        "reaction": ";)",
        "message": "Had a great time"
      },
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "id": 4,
      "reaction": ";)",
      "message": "Had a great time"
    }
    ```

* **Error Response**: **Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "message": "Message cannot be blank",
        "reaction": "Please select a reaction"
      }
    }
    ```

* **Error Response**: Feedback does not belong to user
  * **Status Code**: 403
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Forbidden",
    }
    ```

### Delete Feedback

Removes Feedback user has sent to an Organizer

* **Require Authentication**: true
* **Require Authorization**: Feedback must belong to the current user
* **Request**
  * **Method**: DELETE
  * **Route path**: `/profile/feedback/:feedbackId`
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "feedbackId": 2,
    }
    ```

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Request removed seccessfully"
    }
    ```

* **Error Response**: Feedback does not belong to user
  * **Status Code**: 403
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Forbidden"
    }
    ```

* **Error response**: Couldn't find a Request with the specified id
  * **Status Code**: 404
  * **Headers**:
    * ```Content-Type: application/json```
  * **Body**:

    ```json
    {
      "message": "Request couldn't be found"
    }
    ```

## **Groups API Documentation**

---

### **Get All Groups of the Current User**

Returns a list of all the groups the current user is a part of.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/groups`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "Groups": [
        {
          "id": 1,
          "eventId": 6
          "ownerId": 2
        },
        {
          "id": 1,
          "eventId": 6
          "ownerId": 2
        },
      ]
    }
    ```

* **Error Response: No groups found**
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "No groups could be found"
    }
    ```

---

### **Get Details of a Specific Group**

Returns detailed information about a specific group, including the name, description, image, and member details.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/groups/:groupId`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      {
        "id": 1,
        "eventId": 6
        "ownerId": 2
      }
    }
    ```

* **Error Response: Group not found**
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Group not found"
    }
    ```

---

### **Create a New Group**

Creates a new group and returns the newly created group's information.

* **Require Authentication**: true
* **Request**
  * **Method**: POST
  * **Route path**: `/groups`
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
        {
          "eventId": 6
        },
    ```

* **Successful Response**
  * **Status Code**: 201
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      {
        "id": 1,
        "eventId": 6
        "ownerId": 2
      }
    }
    ```

* **Error Response: Validation errors**
  * **Status Code**: 400
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Event choice is required",
        "description": "Event choice is required"
      }
    }
    ```

---

### **Delete a Group**

Deletes a group. Only the creator of the group is allowed to delete it.

* **Require Authentication**: true
* **Require Proper Authorization**: User must be the creator of the group
* **Request**
  * **Method**: DELETE
  * **Route path**: `/groups/:groupId`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Successfully deleted group"
    }
    ```

* **Error Response: Group not found**
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Group not found"
    }
    ```

---

### **Get All Members of a Group**

Returns a list of all members of a specific group.

* **Require Authentication**: true
* **Request**
  * **Method**: GET
  * **Route path**: `/groups/:groupId/members`
  * **Body**: none

* **Successful Response**
  * **Status Code**: 200
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "Members": [
         {
            "id": 0,
            "username": "'VolunteerLyfe'",
            "email": "'green4lyfe@planet.com'",
            "firstName": "'Susan'",
            "lastName":"'Markcul'",
            "birthday": "'November 16th, 1994'",
            "city": "'somecity'",
            "create_at": "timstamp",
            "saved_filters":["Filter1", "Filter2"],
            "badge_id": [1, 3, 22]
         },
        {
            "id": 3,
            "username": "'VolunteerLyfe1'",
            "email": "'gre3en4lyfe@planet.com'",
            "firstName": "'Suz'",
            "lastName":"'Mark'",
            "birthday": "'November 16th, 1993'",
            "city": "'somewherecity'",
            "create_at": "timestamp",
            "saved_filters":["Filter1", "Filter2"],
            "badge_id": [1, 3, 22]
        }
      ]
    }
    ```

* **Error Response: Group not found**
  * **Status Code**: 404
  * **Headers**:
    * `Content-Type: application/json`
  * **Body**:
    ```json
    {
      "message": "Group not found"
    }
    ```

## Notifications

### View Notifications

### Delete Notifications