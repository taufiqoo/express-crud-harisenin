import {validate} from "../validation/validation.js";
import {
    createContactValidation,
    getContactValidation, searchContactValidation,
    updateContactValidation
} from "../validation/contact-validation.js";
import {prisma} from "../app/db.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const contact = validate(createContactValidation, request);
    contact.username = user.username;

    return prisma.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });
}

const get = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const contact = await prisma.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });

    if (!contact) {
        throw new ResponseError(404, "contact is not found");
    }

    return contact;
}

const update = async (user, request) => {
    const contact = validate(updateContactValidation, request);

    const totalContactInDatabase = await prisma.contact.count({
        where: {
            username: user.username,
            id: contact.id
        }
    });

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found");
    }

    return prisma.contact.update({
        where: {
            id: contact.id
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const remove = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const totalInDatabase = await prisma.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found");
    }

    return prisma.contact.delete({
        where: {
            id: contactId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchContactValidation, request);

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    // Jadi 1 page ada 10 contact
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username: user.username
    })

    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        });
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        });
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        });
    }

    const contacts = await prisma.contact.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prisma.contact.count({
        where: {
            AND: filters
        }
    });

    return {
        data: contacts,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
