import mongoose from 'mongoose';

const LessorSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    registRoom: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
        },
    ],
    contractedRoom: [
        {
            room: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room',
            },
            office: {
                orner: {
                    type: String,
                },
                address: {
                    type: String,
                },
                struture: {
                    type: String,
                },
                acreage: {
                    type: Number,
                },
            },
            
        }
    ],
    payment: [
        {
            tid: {type: String, index: true},
            pgToken: {type: String},
        },
    ],
    credit: {
        type: String,
    },
    address: {
        type: String,
    },
    userType: {
        type: Number,
    },
    token: {
        type: Number,
    },
    // review: [
    //     {
    //         auth: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'Lessee',
    //         },
    //         stars: {
    //             type: Number,
    //         },
    //         content: {
    //             type: String,
    //         },
    //     },
    // ]
});

LessorSchema.statics.findByLessorName = async function(lessorName) {
    return await this.findOne({ name: lessorName }).lean();
}

LessorSchema.statics.findByLessorId = async function(lessorId) {
    return await this.findOne({ id: lessorId }).lean();
}

LessorSchema.statics.Save = async function(instant) {
    if(instant.id != undefined) return await instant.save();

    let idNum = await this.estimatedDocumentCount({});

    instant.id = idNum;
    return await instant.save();
}



LessorSchema.methods.generateToken = function() {
    const token = jwt.sign(
        {
            _id: this.id,
            name: this.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
}

const Lessor = mongoose.model('Lessor', LessorSchema);
export {Lessor};