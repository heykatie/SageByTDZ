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
          "review": "Some Review",
          "created_at": "TimeStamp",
          "updated_at": "TimeStamp" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
          "Event": {
            "id": 1,
            "title": "Help Us",
            "description": "Helping people",
            "organizer_id": 1,
            "categories": ["Outdoor", "LGBT"],
            "address": "1233 Do Good St.",
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
          "review": "Some Review",
          "created_at": "TimeStamp",
          "updated_at": "TimeStamp" ,
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
        "emoji": "User must select an emoji",
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
      "emoji": ":)",
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
      "emoji": ":)",
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
        "emoji": "User must select an emoji",
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

### Create a Event for a Event based on the invite's id

Create and return a new Event for a invites specified by id.

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
        "start_time": "Start time cannot be in the past",
        "end_time": "End time cannot be on or before start time",
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
        "start_time": "Start time cannot be in the past",
        "end_time": "End time cannot be on or before start time",
        "event_date": "Event date cannot be before current date?"
      }
    }
    ```
### Edit Events

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

* Error response: Couldn't find an event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found"
    }
    ```

* Error response: Can't edit an event that's past the end date
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Past event can't be modified"
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
          "event_date": "Existing RSVP for same date and time in system."
        }
      }
    }
    ```
### Delete a Confirmed Event

Delete an existing event.

* Require Authentication: true
* Require proper authorization: Event must belong to the current user
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

* Error response: Couldn't find an event with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Event couldn't be found"
    }
    ```

* Error response: Events that have been started can't be deleted
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
      "Events": [
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