# Database

Database: This database is designed for our anonymous   #Challenge2020  project.

NOTE: Database will be updated gradually.

## Dept

Dept: represent Department (including EduHub itself) of EduHub

### username

username
type: String,
unique: true,
required: true,

### name

type: String,
trim: true,
required: true

### eduHub

FK # null when it is EduHub
type: deptSchema

### parent

### children

[deptSchema],
 // FK # list of direct-child

### category

Note: may be update later # i.e. school/college/university etc.
type: String

### address

- country
- line1
- line2
- zip
- mapCoOrdinate

	- lat
	- lon

### memberGID

FK # discussion required
type: memberGroupSchema

- Member Group Schema 

### since

Note: The date when this dept established
type: Date

### createdAt

type: Date,
default: Date.now()
TODO: Make it uneditable

### updatedAt

type: Date,
TODO: Auto update

### contacts

Array: [{}]

- method

  Note: Method could be i.e. mobile/phone/email/fax/postal etc.
  type: String,
  required: true

- numbers

  List: [{}]
  TODO: Privacy i.e. public/inner etc.

	- number

	  Note: i.e. mobile/phone/email/fax/postal etc. number as string
	  type: String,
	  required: true

	- description

	  Note: About this contact information i.e. name/schedule/office etc.
	  type: String,
	  trim: true

	- active

	  type: Boolean,
	  default: true

### coverImage

TODO: design it

### profileImage

TODO: design it

### shortDescription

Note: Short Description about this dept.
type: String,

### verification

TODO: add more like... verifiedBy, certificate etc.

- verified
- verificationDate

### calenderID

FK # Calender manage routine/schedule etc.
type: calenderSchema

- Calendar Schema 

### libraryID

FK # A Library can be part of Dept/Org etc.
type: librarySchema

- Library Schema 

## User

User: User of this project

Note: add more if necessary

### username

type: String,
required: true,
unique: true,

### name

type: String,
trim: true,

### register

TODO: Privacy i.e. public/inner etc.

- method

  Note: Method (login method) can be email/phone/both 
  type: String,
  trim: true,
  required: true

- email

  type: String,
  unique: true  // Note: Don't know is it possible or not!

- phone

  type: String,
  unique: true  // Note: Don't know is it possible or not!

### birth

- day

  type: String  // dd-mm

- year

  type: String  // yyyy

### bio

Note: Short description about user
type: String

### profileImage

TODO: design it

### coverImage

TODO: design it

### profileID

FK # represents Profile of User... OneToOne Relation
type: profileSchema,
required: true,
unique: true

- Profile Schema

### connected

Note: Quick Reference of different links i.e. [EduHub, Dept, Org etc.]

// orgs: [{}],  // Note: Add it later
// TODO: Add more later if necessary

- eduHubs

  Array: [{}]
  Note: Need discussion

	- category

	  Note: i.e. University/School/College/justDept etc.
	  type: String

	- deptName

	  Note: Name can be stored for quick view of dept without DB-Query of Dept Document
	  type: String

	- deptID

	  FK # Dept reference
	  type: deptSchema

		- Dept Schema

- // orgs: [{}]

  Note: Add it later

### createdAt

type: Date,
default: Date.now()
TODO: Make it uneditable

### updatedAt

type: Date,
TODO: Auto update

## Profile

Profile: Profile of User

TODO: Design it

### userID

Note: Reference to User
type: String

### contacts

Array: [{}]

- method

  Note: Method could be i.e. mobile/phone/email/fax/postal etc.
  type: String,
  required: true

- numbers

  Array: [{}]
  TODO: Privacy i.e. public/inner etc.

	- number

	  Note: i.e. mobile/phone/email/fax/postal etc. number as string
	  type: String,
	  required: true

	- description

	  Note: About this contact information i.e. name/schedule/office etc.
	  type: String,
	  trim: true

	- active

	  type: Boolean,
	  default: true

### presentAddress

Note: Address User is living

- country

  type: String,
  trim: true,
  required: true,

- line1

  type: String,
  trim: true,
  required: true,

- line2

  type: String,
  trim: true

- zip

  type: String,
  trim: true

- mapCoOrdinate

	- lat

	  type: String,
	  trim: true

	- lon

	  type: String,
	  trim: true

### pastAddress

Array: [{}]
Note: Address User lived

- country

  type: String,
  trim: true,
  required: true,

- line1

  type: String,
  trim: true,
  required: true,

- line2

  type: String,
  trim: true

- zip

  type: String,
  trim: true

- mapCoOrdinate

	- lat

	  type: String,
	  trim: true

	- lon

	  type: String,
	  trim: true

### createdAt

type: Date,
default: Date.now()
TODO: Make it uneditable

### updatedAt

type: Date,
TODO: Auto update

## ContentType

ContentType: reference of collection of member in a same Dept/Org/PrivacyGroup etc.

### collection

Note: Represents the name of DB Collection
type: String,
trim: true,
required: true

### appLabel

Note: Represents the name of App or ... nothing....
type: String,
trim: true

## MemberGroup

MemberGroup: represent collection of member in a same Dept/Org/PrivacyGroup etc. as a General Design Patern

Note: add more if necessary

### references

Array: [{}]
Note: same MemberGroup can be part of many Dept/Org/PrivacyGroup... i.e. [dept, library etc.]

- contentType

  FK # Note: reference of collection of member in a same Dept/Org/PrivacyGroup etc.
  type: contentTypeSchema

	- Content Type Schema 

- objectID

  GFK: # Note: object ID of contentTypeCollection of DB 
  type: String

### members

Array: [{}]

- userID

  FK
  type: userSchema,

	- User Schema 

- active

  type: Boolean,
  default: false

- role

  Note: represent the Role in this MemberGroup i.e. admin/moderator/member... etc.
  type: String,
  trim: true

- eID

  Note: represent specific member ID (if necessary) only for this MemberGroup... like roll/enrol...etc.
  type: String,
  trim: true

- since

  Note: this represent the date when membership start in original MemberGroup i.e. Dept/EduHub/Org etc.
  type: Date,

- createdAt

  type: Date,
  default: Date.now()

### createdAt

type: Date,
default: Date.now()

## PrivacyGroup

PrivacyGroup: PrivacyGroup manage the privacy settings

Note: add more if necessary

### references

Array: [{}]
Note: same PrivacyGroup can be part of many Settings/Post/Discussion/... i.e. [post, settings, discussion etc.]

- contentType

  FK # Note: reference of collection of member in a same Settings/Post/Discussion/ etc.
  type: contentTypeSchema

	- Content Type Schema

- objectID

  GFK: # Note: object ID of contentTypeCollection of DB 
  type: String

### members

Note: Users of this Privacy Group

- userID

  FK # User

	- User Schema

### createdAt

type: Date,
default: Date.now()

## Calender

Calender: It represent the Calender that includes routine/Schedule etc. # Note: it is a broad design section  

Note: add more if necessary

TODO: Design it later

### contentType

FK # Note: reference of Dept/Org etc.
type: contentTypeSchema

- Content Type Schema

### objectID

GFK: # Note: object ID of contentTypeCollection of DB 
type: String

### createdAt

type: Date,
default: Date.now()

## Library

Library: Library is a broad concept in this project # A Library can be part of Dept/Org etc.

Note: add more if necessary
TODO: Design it later

### contentType

FK # Note: reference of Dept/Org etc.
type: contentTypeSchema

- Content Type Schema

### objectID

GFK: # Note: object ID of contentTypeCollection of DB 
type: String

### createdAt

type: Date,
default: Date.now()

## Lesson

Lesson: Lesson represend a class/lecture/tutorial

TODO: add more if necessary

### content

type: String

### files

Array: [{}]

- name

  type: String

- url

  type: String

- fileID

  FK # file representaion i.e. txt,doc,pdf etc
  type: fileSchema

	- File Schema 

### images

Array: [{}]

- url

  type: String

- imageID

  FK # image representation i.e. jpg, png, gif
  type: imageSchema

	- Image Schema 

### slides

Array: [{}]
FK # slide representation
type: slideSchema

- SlideSchema 

### video

FK # vedio representtion
type: videoSchema

- Video Schema 

### audio

FK # audio representtion
type: audioSchema

- Audio Schema 

### assignment

FK # assignment representation
type: assignmentSchema

- Assignment Schema 

### discussion

FK # discussion representation
type: discussionSchema

- Discussion Schema 

### reaction

FK # reaction representation
type: reactionSchema

- Reaction Schema 

### privacy

- method

  type: String

- privacyGID

  FK # privacyGroup representation
  type: privacyGroupSchema

	- Privacy Schema 

### createdAt

type: Date,
default: Date.now()

TODO: Make it uneditable

### updatedAt

type: Date,

TODO: Auto update

## Reaction

## Discussion

## File

File: File will be stored in storage and represented information in DB

Note: Add if necessary

### info

- name

  type: String

- extension

  type: String

- size

  type: Number

### description

type: String

### url

type: String

### references

Array: [{}]
Note: same File can be part of many entities... i.e. [lesson,post,... etc.]

- contentType

  FK # Note: reference of Collection i.e. lesson/post... etc.
  type: contentTypeSchema

	- Content Type Schema

- objectID

  GFK: # Note: object ID of contentTypeCollection of DB 
  type: String

### createdAt

type: Date,
default: Date.now()
TODO: Make it uneditable

### updatedAt

type: Date,
TODO: Auto update

## Image

Image: Image will be stored in storage and represented information in DB

Note: Add if necessary

### info

- name

  type: String

- extension

  type: String

- size

  type: Number

- height

  type: Number

- weight

  type: Number

### description

type: String

### url

type: String

### references

Array: [{}]
Note: same Image can be part of many entities... i.e. [lesson,post,... etc.]

- contentType

  FK # Note: reference of Collection i.e. lesson/post... etc.
  type: contentTypeSchema

	- Content Type Schema

- objectID

  GFK: # Note: object ID of contentTypeCollection of DB 
  type: String

### discussion

FK # discussion representation
type: discussionSchema

- Discussion Schema 

### reaction

FK # reaction representation
type: reactionSchema

- Reaction Schema 

### createdAt

type: Date,
default: Date.now()
TODO: Make it uneditable

### updatedAt

type: Date,
TODO: Make it uneditable

## Slide

Slide: Slide will be stored in storage and represented information in DB

Note: Add if necessary

### info

- name

  type: String

- extension

  type: String

- size

  type: Number

- height

  type: Number

- weight

  type: Number

### description

type: String

### url

type: String

### references

Array: [{}]
Note: same Slide can be part of many entities... i.e. [lesson,post,... etc.]

- contentType

  FK # Note: reference of Collection i.e. lesson/post... etc.
  type: contentTypeSchema

	- Content Type Schema

- objectID

  GFK: # Note: object ID of contentTypeCollection of DB 
  type: String

### discussion

FK # discussion representation
type: discussionSchema

- Discussion Schema 

### reaction

FK # reaction representation
type: reactionSchema

- Reaction Schema 

### createdAt

type: Date,
default: Date.now()
TODO: Make it uneditable

### updatedAt

type: Date,
TODO: Auto update

## Video

Video: Video represents all kind of video i.e. [live, normal, watch-party..] etc.

Note: Add if necessary

### category

Note: video category represents [live, normal, watch-party..] etc.
type: String

### info

Note: dimention: ... need to disscuss

- name

  type: String

- extension

  type: String

- size

  type: Number

- duration

  type: Number

### description

type: String

### url

type: String

### references

Array: [{}]
Note: same Video can be part of many entities... i.e. [lesson,post,... etc.]

- contentType

  FK # Note: reference of Collection i.e. lesson/post... etc.
  type: contentTypeSchema

	- Content Type Schema 

- objectID

  GFK: # Note: object ID of contentTypeCollection of DB 
  type: String

### discussion

FK # discussion representation
type: discussionSchema

- Discussion Schema 

### reaction

FK # reaction representation
type: reactionSchema

- Reaction Schema 

### createdAt

type: Date,
default: Date.now()
TODO: Make it uneditable

### updatedAt

type: Date,
TODO: Auto update

## Audio

Audio: Audio represents all kind of video i.e. [broadcast, recorded, listening-party..] etc. 

Note: Add if necessary

### category

Note: audio category represents [broadcast, recorded, listening-party..] etc.
type: String

### info

- name

  type: String

- extension

  type: String

- size

  type: Number

- duration

  type: Number

### description

type: String

### url

type: String

### references

Array: [{}]
Note: same File can be part of many entities... i.e. [lesson,post,... etc.]

- contentType

  FK # Note: reference of Collection i.e. lesson/post... etc.
  type: contentTypeSchema

	- Content Type Schema 

- objectID

  GFK: # Note: object ID of contentTypeCollection of DB 
  type: String

### discussion

FK # discussion representation
type: discussionSchema

- Discussion Schema 

### reaction

FK # reaction representation
type: reactionSchema

- Reaction Schema 

### createdAt

type: Date,
default: Date.now()
TODO: Make it uneditable

### updatedAt

type: Date,
TODO: Auto update

## Editorial

Editorial:


TODO:

## Assignment

Assignment:... NOTE: Disscussion required

TODO:

## Notations/Symbols

### Need Discussion

- 

### Referance/FK/GFK

- 

### Focus Point

- 

*XMind - Trial Version*