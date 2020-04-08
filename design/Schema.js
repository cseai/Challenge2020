/*
=====================================================================
                    Schema Design
=====================================================================
NOTE:
    - Pre-requisit Schema comes first
    - Add comment if necessary so that everyone can understand
    - Follow the design pattern
    - Commit for changes
=====================================================================
*/


// User: User of this project
const userSchema = {
    username: {
        type: String,
        required: true,
        unique: true,
    }
    // Note: add more if necessary
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
    reference: [{  // Note: same MemberGroup can be part of many Dept/Org/PrivacyGroup... i.e. [dept, library etc.]
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


// File:
const fileSchema = {
    // TODO:
}

// Image:
const imageSchema = {
    // TODO:
}


// Slide:
const slideSchema = {
    // TODO:
}


// Discussion:
const discussionSchema = {
    // TODO:
}


// PrivacyGroup: PrivacyGroup manage the privacy settings
const privacyGroupSchema = {
    // TODO:
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