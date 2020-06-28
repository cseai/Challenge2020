/* LIBRARY DB DESIGN
- Library Name
- Book
- Author
- Other Resources
- Librarians/Controllers
- Transaction
*/

// Author: Author of Book or...(consider later)
const authorSchema = {
    name: {
        type: String,
        required: [true, 'Author must have a name'],
    },
    nicname: {
        type: String
        // Note: remove it if you think unnecessary
    },
    verified: {
        type: Boolean,
        default: false
        // Note: How can be verified... think later
    },
    realUser: {
        // If Author is a `User` too
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Author gender is required field']
    },
    bio: {
        type: String
    },
    contacts: [{
        method: {
            type: String, // Note: Method could be i.e. mobile/phone/email/fax/postal etc.
            enum: ['mobile', 'phone', 'email'],
            required: [true, 'Contact must have a method type!']
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
    address: {
        country: {
            type: String,
            trim: true,
            // required: true,
        },
        line1: {
            type: String,
            trim: true,
            // required: true,
        },
        line2: {
            type: String,
            trim: true
        },
        zip: {
            type: String,
            trim: true
        },
        // GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Make it autoupdate
    }
}

// Book: Book of a library
const bookSchema = {
    library: {
        type: mongoose.Schema.ObjectId,
        ref: 'Library'
    },
    title: {
        type: String,
        required: [true, 'Book must have a title']
    },
    authors: [{
        authorName: {
            type: String,
            trim: true,
            required: true
        },
        authorId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Author',
            required: true
        }
    }],
    edition: {
        type: String
    },
    pagination: {
        type: String
    },
    accessionNumber: {
        type: String,
        // required: [true, 'Book must have an accession number']
        // Note: need customization later -> uniqe or not
    },
    callNumber: {
        type: String
    },
    copyNumber: {
        type: String
    },
    isbn: {
        type: String,
        required: [true, 'Book must have an isbn number']
        // Note: need customization later -> uniqe or not
    },
    publisher: {
        type: String
    },
    description: {
        type: String
    },
    language: {
        type: String
    },
    publicationDate: {
        type: Date
        // Note: may be it's type can be string...only YEAR and/or MONTH
    },
    lastRevisionDate: {
        type: Date
        // Note: may be it's type can be string...only YEAR and/or MONTH
    },
    price: {
        quantity: Number,
        currency: String
        // Note: need discussion
    },
    barcode: {
        type: String
    },
    image: {
        type: String
        // Note: add extra property if required...like size, same image with different size
    },
    depts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Dept'
    }],
    tags: [{
        type: String
        // Note: redesign later
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    infoProvided: {
        type: Number,
        min: 0,
        max: 100,
        default: 20
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Make it autoupdate
    }
}

// Resource
const resourceScema = {
    library: {
        type: mongoose.Schema.ObjectId,
        ref: 'Library'
    },
    title: {
        type: String,
        required: [true, 'Resource must have a title']
    },
    category: {
        type: String,
        enum: ['magagin', 'software', 'hardware', 'other'],
        required: [true, 'Resource must have a category']
    },
    accessionNumber: {
        type: String,
        // required: [true, 'Book must have an accession number']
        // Note: need customization later -> uniqe or not
    },
    callNumber: {
        type: String
    },
    copyNumber: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        quantity: Number,
        currency: String
        // Note: need discussion
    },
    barcode: {
        type: String
    },
    image: {
        type: String
        // Note: add extra property if required...like size, same image with different size
    },
    depts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Dept'
    }],
    tags: [{
        type: String
        // Note: redesign later
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    },
    infoProvided: {
        type: Number,
        min: 0,
        max: 100,
        default: 20
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Make it autoupdate
    }
}

// Library: Library is a broad concept in this project # A Library can be part of Dept/Org etc.
const librarySchema = {
    dept: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dept'
    },
    name: {
        type: String,
        required: [true, 'Library must have a name']
    },
    username: {
        type: String,
        unique: [true, 'Library username must be unique']
        // Note: set random unique username when it first create
    },
    coverImage: {
        type: String,
        // TODO: design it
    },
    profileImage: {
        type: String,
        // TODO: design it
    },
    since: {
        type: Date // Note: The date when this dept established
    },
    shortDescription: {
        type: String, // Note: Short Description about this dept.
    },
    contacts: [{
        method: {
            type: String, // Note: Method could be i.e. mobile/phone/email/fax/postal etc.
            enum: ['mobile', 'phone', 'email'],
            required: [true, 'Contact must have a method type!']
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
    address: {
        country: {
            type: String,
            trim: true,
            // required: true,
        },
        line1: {
            type: String,
            trim: true,
            // required: true,
        },
        line2: {
            type: String,
            trim: true
        },
        zip: {
            type: String,
            trim: true
        },
        // GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
    },
    controllers: [{ // NOTE: Only librarian who controle library belongs here
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        role: {
            type: String,
            enum: ['admin', 'moderator', 'librarian', 'staff'],
            default: 'librarian',
        },
        active: {
            type: Boolean,
            default: true
        }
    }],
    memberGroup: {
        // Same as Dept's `memberGroup`... and always ref same `MemberGroup` for Dept and Library
        type: mongoose.Schema.ObjectId,
        ref: 'MemberGroup' // FK # discussion required
        // NOTE: It should redesign to maintain Transactions... discussion required
    },
    active: {
        type: Boolean,
        default: true
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
    // Note: add more if necessary
}

// Transaction: Transaction of Book or Resourse in a Library
const transactionSchema = {
    library: {
        type: mongoose.Schema.ObjectId,
        ref: 'Library'
    },
    contentType: {
        type: String,
        enum: ['book', 'resource'],
        required: [true, `Content type required`]
    },
    objectId: { 
        // NOTE: We can not give `ref`, because it is GFK ref... later it implemet
        type: mongoose.Schema.ObjectId,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
        // Note: This should be same as created at... default: Date.now()
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    comment: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    issuedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
        // TODO: Make it uneditable
    },
    updatedAt: {
        type: Date,
        // TODO: Make it autoupdate
    }
}