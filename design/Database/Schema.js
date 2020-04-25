/*
=====================================================================
                    Schema Design
=====================================================================
NOTE:
    - Pre-requisit Schema comes first
    - Add comment if necessary so that everyone can understand
    - Follow the design pattern
    - Commit for changes
    - Array property name keep PluralNoune
=====================================================================
*/


// Profile: Profile of User
const profileSchema = {
    // TODO: Design it
    userID: {
        type: String // Note: Reference to User
    },
    /*
    register: {
        method: {
            type: String,  // Note: Method (login method) can be email/phone/both 
            trim: true,
            required: true
        },
        email: {
            type: String,
            unique: true   // Note: Don't know is it possible or not!
        },
        phone: {
            type: String,
            unique: true   // Note: Don't know is it possible or not!
        },
        // TODO: Privacy i.e. public/inner etc.
    },
    */
    birth: {
        day: {
            type: String  // dd-mm
        },
        year: {
            type: String  // yyyy
        }
    },
    bio: {
        type: String  // Note: Short description about user
    },
    profileImage: {
        // TODO: design it
    },
    coverImage: {
        // TODO: design it
    },
    contacts: [{
        method: {
            type: String, // Note: Method could be i.e. mobile/phone/email/fax/postal etc.
            required: true
        },
        numbers: [{
            number: {
                type: String, // Note: i.e. mobile/phone/email/fax/postal etc. number as string
                required: true
            },
            description: {
                type: String, // Note: About this contact information i.e. name/schedule/office etc.
                trim: true
            },
            active: {
                type: Boolean,
                default: true
            }
            // TODO: Privacy i.e. public/inner etc.
        }]
    }],
    presentAddress: {  // Note: Address User is living
        country: {
            type: String,
            trim: true,
            required: true,
        },
        line1: {
            type: String,
            trim: true,
            required: true,
        },
        line2: {
            type: String,
            trim: true
        },
        zip: {
            type: String,
            trim: true
        },
        mapCoOrdinate: {
            lat: {
                type: String,
                trim: true
            },
            lon: {
                type: String,
                trim: true
            }
        }
    },
    pastAddress: [{   // Note: Address User lived
        country: {
            type: String,
            trim: true,
            required: true,
        },
        line1: {
            type: String,
            trim: true,
            required: true,
        },
        line2: {
            type: String,
            trim: true
        },
        zip: {
            type: String,
            trim: true
        },
        mapCoOrdinate: {
            lat: {
                type: String,
                trim: true
            },
            lon: {
                type: String,
                trim: true
            }
        }
    }],
    connected: {  // Note: Quick Reference of different links i.e. [EduHub, Dept, Org etc.]
        eduHubs: [{    // Note: Need discussion
            category: {
                type: String // Note: i.e. University/School/College/justDept etc.
            },
            deptName: {
                type: String  // Note: Name can be stored for quick view of dept without DB-Query of Dept Document
            },
            deptID: {
                type: deptSchema  // FK # Dept reference
            }
        }],
        // orgs: [{}],  // Note: Add it later
        // TODO: Add more later if necessary
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    }
}


// User: User of this project
const userSchema = {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
    },
    // profileID: {
    //     type: profileSchema,  // FK # represents Profile of User... OneToOne Relation
    //     required: true,
    //     unique: true  
    // },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    }
    // TODO: add more if necessary
}


// ContentType: reference of collection of member in a same Dept/Org/PrivacyGroup etc.
const contentTypeSchema = {
    collection: {
        type: String, // Note: Represents the name of DB Collection
        trim: true,
        required: true
    },
    appLabel: {
        type: String, // Note: Represents the name of App or ... nothing....
        trim: true
    }
}


// MemberGroup: represent collection of member in a same Dept/Org/PrivacyGroup etc. as a General Design Patern
const memberGroupSchema = {
    references: [{  // Note: same MemberGroup can be part of many Dept/Org/PrivacyGroup... i.e. [dept, library etc.]
        contentType: { 
            type: contentTypeSchema // FK # Note: reference of collection of member in a same Dept/Org/PrivacyGroup etc.
        },
        objectID: {
            type: String // GFK: # Note: object ID of contentTypeCollection of DB 
        }
    }],
    members: [{
        userID: {
            type: userSchema, // FK
        },
        active: {
            type: Boolean,
            default: false
        },
        role: {
            type: String, // Note: represent the Role in this MemberGroup i.e. admin/moderator/member... etc.
            trim: true
        },
        eID: {
            type: String, // Note: represent specific member ID (if necessary) only for this MemberGroup... like roll/enrol...etc.
            trim: true
        },
        since: {
            type: Date, // Note: this represent the date when membership start in original MemberGroup i.e. Dept/EduHub/Org etc.
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // Note: add more if necessary
}


// PrivacyGroup: PrivacyGroup manage the privacy settings
const privacyGroupSchema = {
    references: [{  // Note: same PrivacyGroup can be part of many Settings/Post/Discussion/... i.e. [post, settings, discussion etc.]
        contentType: { 
            type: contentTypeSchema // FK # Note: reference of collection of member in a same Settings/Post/Discussion/ etc.
        },
        objectID: {
            type: String // GFK: # Note: object ID of contentTypeCollection of DB 
        }
    }],
    members: [{  // Note: Users of this Privacy Group
        userID: {
            type: userSchema, // FK # User
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // Note: add more if necessary
}


// Calender: It represent the Calender that includes routine/Schedule etc. # Note: it is a broad design section
const calenderSchema = {
    contentType: { 
        type: contentTypeSchema // FK # Note: reference of Dept/Org etc.
    },
    objectID: {
        type: String // GFK: # Note: object ID of contentTypeCollection of DB 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // Note: add more if necessary
    // TODO: Design it later
}


// Library: Library is a broad concept in this project # A Library can be part of Dept/Org etc.
const librarySchema = {
    contentType: { 
        type: contentTypeSchema // FK # Note: reference of Dept/Org etc.
    },
    objectID: {
        type: String // GFK: # Note: object ID of contentTypeCollection of DB 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // Note: add more if necessary
    // TODO: Design it later
}


// Department: represent Department (including EduHub itself) of EduHub
const deptSchema = {
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    eduHub: {
        type: deptSchema // FK # null when it is EduHub
    },
    parent: {
        type: deptSchema // FK # null when it is EduHub
    },
    children: [deptSchema], // FK # list of direct-child
    category: {
        type: String     // Note: may be update later # i.e. school/college/university etc.
    },
    address: {
        country: {
            type: String,
            trim: true,
            required: true,
        },
        line1: {
            type: String,
            trim: true,
            required: true,
        },
        line2: {
            type: String,
            trim: true
        },
        zip: {
            type: String,
            trim: true
        },
        mapCoOrdinate: {
            lat: {
                type: String,
                trim: true
            },
            lon: {
                type: String,
                trim: true
            }
        }
    },
    memberGID: {
        type: memberGroupSchema // FK # discussion required
    },
    since: {
        type: Date // Note: The date when this dept established
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    contacts: [{
        method: {
            type: String, // Note: Method could be i.e. mobile/phone/email/fax/postal etc.
            required: true
        },
        numbers: [{
            number: {
                type: String, // Note: i.e. mobile/phone/email/fax/postal etc. number as string
                required: true
            },
            description: {
                type: String, // Note: About this contact information i.e. name/schedule/office etc.
                trim: true
            },
            active: {
                type: Boolean,
                default: true
            }
            // TODO: Privacy i.e. public/inner etc.
        }]
    }],
    coverImage: {
        // TODO: design it
    },
    profileImage: {
        // TODO: design it
    },
    shortDescription: {
        type: String, // Note: Short Description about this dept.
    },
    verification: {
        verified: {
            type: Boolean,
            default: false
        },
        verificationDate: {
            type: Date, 
        }
        // TODO: add more like... verifiedBy, certificate etc. 
    },
    calenderID: {
        type: calenderSchema // FK # Calender manage routine/schedule etc.
    },
    libraryID: {
        type: librarySchema // FK # A Library can be part of Dept/Org etc.
    },
    // Note: add more if necessary
}


// Reaction:
const reactionSchema = {
    // TODO:
}


// Discussion:
const discussionSchema = {
    // TODO:
}


// File: File will be stored in storage and represented information in DB
const fileSchema = {
    info: {
        name: {
            type: String
        },
        extension: {
            type: String
        },
        size: {
            type: Number
        }
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    references: [{  // Note: same File can be part of many entities... i.e. [lesson,post,... etc.]
        contentType: { 
            type: contentTypeSchema // FK # Note: reference of Collection i.e. lesson/post... etc.
        },
        objectID: {
            type: String // GFK: # Note: object ID of contentTypeCollection of DB 
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    // Note: Add if necessary
}


// Image: Image will be stored in storage and represented information in DB
const imageSchema = {
    info: {
        name: {
            type: String
        },
        extension: {
            type: String
        },
        size: {
            type: Number
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        }
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    references: [{  // Note: same Image can be part of many entities... i.e. [lesson,post,... etc.]
        contentType: { 
            type: contentTypeSchema // FK # Note: reference of Collection i.e. lesson/post... etc.
        },
        objectID: {
            type: String // GFK: # Note: object ID of contentTypeCollection of DB 
        }
    }],
    discussion: {
        type: discussionSchema // FK # discussion representation
    },
    reaction: {
        type: reactionSchema   // FK # reaction representation
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    // Note: Add if necessary
}


// Slide: Slide will be stored in storage and represented information in DB
const slideSchema = {
    info: {
        name: {
            type: String
        },
        extension: {
            type: String
        },
        size: {
            type: Number
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        }
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    references: [{  // Note: same Slide can be part of many entities... i.e. [lesson,post,... etc.]
        contentType: { 
            type: contentTypeSchema // FK # Note: reference of Collection i.e. lesson/post... etc.
        },
        objectID: {
            type: String // GFK: # Note: object ID of contentTypeCollection of DB 
        }
    }],
    discussion: {
        type: discussionSchema // FK # discussion representation
    },
    reaction: {
        type: reactionSchema   // FK # reaction representation
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    // Note: Add if necessary
}


// Video: Video represents all kind of video i.e. [live, normal, watch-party..] etc.
const videoSchema = {
    category: {
        type: String   // Note: video category represents [live, normal, watch-party..] etc.
    },
    info: {
        name: {
            type: String
        },
        extension: {
            type: String
        },
        size: {
            type: Number
        },
        duration: {
            type: Number
        },
        // dimention: ... need to disscuss
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    references: [{  // Note: same Video can be part of many entities... i.e. [lesson,post,... etc.]
        contentType: { 
            type: contentTypeSchema // FK # Note: reference of Collection i.e. lesson/post... etc.
        },
        objectID: {
            type: String // GFK: # Note: object ID of contentTypeCollection of DB 
        }
    }],
    discussion: {
        type: discussionSchema // FK # discussion representation
    },
    reaction: {
        type: reactionSchema   // FK # reaction representation
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    // Note: Add if necessary
}


// Audio: Audio represents all kind of video i.e. [broadcast, recorded, listening-party..] etc. 
const audioSchema = {
    category: {
        type: String   // Note: audio category represents [broadcast, recorded, listening-party..] etc.
    },
    info: {
        name: {
            type: String
        },
        extension: {
            type: String
        },
        size: {
            type: Number
        },
        duration: {
            type: Number
        }
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    references: [{  // Note: same File can be part of many entities... i.e. [lesson,post,... etc.]
        contentType: { 
            type: contentTypeSchema // FK # Note: reference of Collection i.e. lesson/post... etc.
        },
        objectID: {
            type: String // GFK: # Note: object ID of contentTypeCollection of DB 
        }
    }],
    discussion: {
        type: discussionSchema // FK # discussion representation
    },
    reaction: {
        type: reactionSchema   // FK # reaction representation
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    // Note: Add if necessary
}


// Editorial: 
const editorialSchema = {
    // TODO: 
}


// MCQ: MCQ stands for Multiple Choise Question
const mcqSchema = {  
    stem: {   // See: https:ar.cetl.hku.hk/am_mcq.htm
        text: {
            type: String
        },
        image: {
            url: {
                type: String
            },
            height: {
                type: Number
            },
            weight: {
                type: Number
            }
        },
        required: true
    },
    options: [{
        text: {
            type: String
        },
        image: {
            url: {
                type: String
            },
            height: {
                type: Number
            },
            weight: {
                type: Number
            }
        },
        isKey: {
            type: Boolean,
            default: false
        }
    }],
    info: {
        numberOfOption: {
            type: Number,
            default: 0
            // Note: Autometic update
        },
        numberOfKey: {  //Note: Key means correct answer
            type: Number,
            default: 0
            // Note: Autometic update
        },
        numberOfResponse:{
            type: Number,  // Note: The number of time User answered this MCQ
            default: 0
        },
        numberOfCorrectResponse: {
            type: Number,  // Note: The number of time User answered correct this MCQ
            default: 0
        }
    },
    explanation: {
        text: {
            type: String
        },
        images: [{
            url: {
                type: String
            },
            height: {
                type: Number
            },
            weight: {
                type: Number
            }
        }],
        editorials: [{
            userID: {
                type: userSchema // FK # User who created this editorial
            },
            editorial: {
                type: editorialSchema   // FK # editorial of this MCQ ... if required
            }
        }]
    },
    specific: {
        levels: [{
            type: String // Note: represents class/level etc
        }],
        subjects: [{
            type: String // Note: represents subject/category etc
        }],
        topics: [{
            type: String // Note: represents topic/chapter etc
        }],
        medium: {
            type: String // Note: Representational language i.e. Bangla/English... etc
        },
        startYear: {
            type: Number // Note: Year (yyyy) since this MCQ conserned as reasonable
        },
        country: {
            type: String // Note: Country name
        },
        // Note: Add if required
    },
    privacy: {
        method: {
            type: String
        },
        privacyGID: {
            type: privacyGroupSchema // FK # privacyGroup representation
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    // Note: Add if necessary
}


// CQ: CQ represents CreativeQuestion/Question/Quiz etc
const cqSchema = {
    stem: {
        text: {
            type: String
        },
        images: [{
            url: {
                type: String
            },
            height: {
                type: Number
            },
            weight: {
                type: Number
            }
        }]
    },
    questions: [{
        text: {
            type: String
        },
        image: {
            url: {
                type: String
            },
            height: {
                type: Number
            },
            weight: {
                type: Number
            }
        },
        // Note: Add if required
    }],
    info: {
        numberOfPart: {
            type: Number,
            default: 0
            // Note: Autometic update
        },
        numberOfResponse:{
            type: Number,  // Note: The number of time User answered this CQ
            default: 0
        }
    },
    explanation: {
        text: {
            type: String
        },
        images: [{
            url: {
                type: String
            },
            height: {
                type: Number
            },
            weight: {
                type: Number
            }
        }],
        editorials: [{
            userID: {
                type: userSchema // FK # User who created this editorial
            },
            editorial: {
                type: editorialSchema   // FK # editorial of this MCQ ... if required
            }
        }]
    },
    specific: {
        levels: [{
            type: String // Note: represents class/level etc
        }],
        subjects: [{
            type: String // Note: represents subject/category etc
        }],
        topics: [{
            type: String // Note: represents topic/chapter etc
        }],
        medium: {
            type: String // Note: Representational language i.e. Bangla/English... etc
        },
        startYear: {
            type: Number // Note: Year (yyyy) since this MCQ conserned as reasonable
        },
        country: {
            type: String // Note: Country name
        },
        // Note: Add if required
    },
    privacy: {
        method: {
            type: String
        },
        privacyGID: {
            type: privacyGroupSchema // FK # privacyGroup representation
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    },
    // Note: Add if necessary
}


// Assignment:... NOTE: Disscussion required
const assignmentSchema = {
    questions: [{
        type: String
    }],
    editorial: [{
        type: editorialSchema  // FK # editorial means actual (possible) solution of question by Tutor
    }],
    answers: [{
        type: editorialSchema // FK # answer means reply of assignment (solution) of question by Student
    }],
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    }
    // TODO: If required
}


// Lesson: Lesson represend a class/lecture/tutorial
const lessonSchema = {
    content: {
        type: String
    },
    files: [{
        name: {
            type: String
        },
        url: {
            type: String
        },
        fileID: {
            type: fileSchema // FK # file representaion i.e. txt,doc,pdf etc
        }
    }],
    images: [{
        url: {
            type: String
        },
        imageID: {
            type: imageSchema // FK # image representation i.e. jpg, png, gif
        }
    }],
    slides: [{
        type: slideSchema     // FK # slide representation
    }],
    video: {
        type: videoSchema     // FK # vedio representtion
    },
    audio: {
        type: audioSchema     // FK # audio representtion
    },
    assignment: {
        type: assignmentSchema // FK # assignment representation
    },
    discussion: {
        type: discussionSchema // FK # discussion representation
    },
    reaction: {
        type: reactionSchema   // FK # reaction representation
    },
    privacy: {
        method: {
            type: String
        },
        privacyGID: {
            type: privacyGroupSchema // FK # privacyGroup representation
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Auto update
    }
    // TODO: add more if necessary
}