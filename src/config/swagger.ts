import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Books Management API',
        version: '1.0.0',
        description: 'API documentation for managing authors and their books within the Books Management application.',
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            // author schemas
            RegisterAuthorRequest: {
                type: 'object',
                required: ['name', 'email', 'password', 'bio'],
                properties: {
                    name: {type: 'string', example: 'Moon Knight'},
                    email: {type: 'string', example: 'moonknight@marvel.com'},
                    password: {type: 'string', example: 'strongpassword123'},
                    bio: {type: 'string', example: 'A former vigilante now pursuing a career as a writer.'},
                },
            },
            LoginAuthorRequest: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {type: 'string', example: 'moonknight@marvel.com'},
                    password: {type: 'string', example: 'strongpassword123'},
                },
            },
            AuthorResponse: {
                type: 'object',
                properties: {
                    code: {type: 'integer', example: 200},
                    status: {type: 'string', example: 'OK'},
                    data: {
                        type: 'object',
                        properties: {
                            _id: {type: 'string', example: '609c67cbd1f6f2b7f68e4ae7'},
                            name: {type: 'string', example: 'Moon Knight'},
                            email: {type: 'string', example: 'moonknight@marvel.com'},
                            bio: {type: 'string', example: 'A former vigilante now pursuing a career as a writer.'},
                            access_token: {type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'},
                            refresh_token: {type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'},
                            created_at: {
                                type: 'string',
                                example: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
                            },
                            updated_at: {
                                type: 'string',
                                example: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
                            },
                        }
                    },
                },
            },
            RegisterAuthorResponse: {
                type: 'object',
                properties: {
                    code: {type: 'integer', example: 201},
                    status: {type: 'string', example: 'Created'},
                    data: {
                        type: 'object',
                        properties: {
                            _id: {type: 'string', example: '609c67cbd1f6f2b7f68e4ae7'},
                            name: {type: 'string', example: 'Moon Knight'},
                            email: {type: 'string', example: 'moonknight@marvel.com'},
                            bio: {type: 'string', example: 'A former vigilante now pursuing a career as a writer.'},
                            created_at: {
                                type: 'string',
                                example: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
                            },
                            updated_at: {
                                type: 'string',
                                example: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
                            },
                        }
                    },
                },
            },

            // book schemas
            CreateBookRequest: {
                type: 'object',
                required: ['title', 'author', 'publisher', 'publish_year', 'genre', 'isbn'],
                properties: {
                    title: { type: 'string', example: 'The Amazing Spider-Man' },
                    author: { type: 'string', example: '609c67cbd1f6f2b7f68e4ae7' }, // Contoh ID penulis
                    publisher: { type: 'string', example: 'Marvel Comics' },
                    publish_year: { type: 'string', example: '2024' },
                    genre: { type: 'string', example: 'Action' },
                    isbn: { type: 'string', example: '978-3-16-148410-0' },
                },
            },
            UpdateBookRequest: {
                type: 'object',
                properties: {
                    title: { type: 'string', example: 'The Amazing Spider-Man' },
                    author: { type: 'string', example: '609c67cbd1f6f2b7f68e4ae7' },
                    publisher: { type: 'string', example: 'Marvel Comics' },
                    publish_year: { type: 'string', example: '2022' },
                    genre: { type: 'string', example: 'Action' },
                    isbn: { type: 'string', example: '978-3-16-148410-0' },
                },
            },
            BookResponse: {
                type: 'object',
                properties: {
                    code:{type: 'number', example: 200},
                    status:{type: 'string', example: 'OK'},
                    data: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string', example: '609c67cbd1f6f2b7f68e4ae8' },
                            title: { type: 'string', example: 'The Amazing Spider-Man' },
                            author: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string', example: '609c67cbd1f6f2b7f68e4ae7' },
                                    name: { type: 'string', example: 'Moon Knight' },
                                    email: { type: 'string', example: 'moonknight@marvel.com' },
                                    bio: { type: 'string', example: 'Formerly known as Marc Spector, he writes about his adventures.' },
                                },
                            },
                            publisher: { type: 'string', example: 'Marvel Comics' },
                            publish_year: { type: 'string', example: '2022' },
                            genre: { type: 'string', example: 'Action' },
                            isbn: { type: 'string', example: '978-3-16-148410-0' },
                            created_at: { type: 'string', format: 'date-time', example: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}) },
                            updated_at: { type: 'string', format: 'date-time', example: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}) },
                        }
                    }
                },
            },
            CreatedBookResponse: {
                type: 'object',
                properties: {
                    code:{type: 'number', example: 201},
                    status:{type: 'string', example: 'Created'},
                    data: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string', example: '609c67cbd1f6f2b7f68e4ae8' },
                            title: { type: 'string', example: 'The Amazing Spider-Man' },
                            author: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string', example: '609c67cbd1f6f2b7f68e4ae7' },
                                    name: { type: 'string', example: 'Moon Knight' },
                                    email: { type: 'string', example: 'moonknight@marvel.com' },
                                    bio: { type: 'string', example: 'Formerly known as Marc Spector, he writes about his adventures.' },
                                },
                            },
                            publisher: { type: 'string', example: 'Marvel Comics' },
                            publish_year: { type: 'string', example: '2022' },
                            genre: { type: 'string', example: 'Action' },
                            isbn: { type: 'string', example: '978-3-16-148410-0' },
                            created_at: { type: 'string', format: 'date-time', example: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}) },
                            updated_at: { type: 'string', format: 'date-time', example: new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}) },
                        }
                    }
                },
            },

            // error schemas
            ErrorResponse400: {
                type: 'object',
                properties: {
                    code: {type: 'integer', example: 400},
                    status: {type: 'string', example: 'Bad Request'},
                    errors: {type: 'string', example: 'Error message about bad request.'},
                },
            },
            ErrorResponse401: {
                type: 'object',
                properties: {
                    code: {type: 'integer', example: 401},
                    status: {type: 'string', example: 'Unauthorized'},
                    errors: {type: 'string', example: 'Error message about unauthorized request.'},
                },
            },
            ErrorResponse403: {
                type: 'object',
                properties: {
                    code: {type: 'integer', example: 403},
                    status: {type: 'string', example: 'Forbidden'},
                    errors: {type: 'string', example: 'Error message about forbidden request.'},
                },
            },
            ErrorResponse404: {
                type: 'object',
                properties: {
                    code: {type: 'integer', example: 404},
                    status: {type: 'string', example: 'Not Found'},
                    errors: {type: 'string', example: 'Error message about not found request.'},
                },
            },
            ErrorResponse409: {
                type: 'object',
                properties: {
                    code: {type: 'integer', example: 409},
                    status: {type: 'string', example: 'Conflict'},
                    errors: {type: 'string', example: 'Error message about conflict request'},
                },
            },
            ErrorResponse422: {
                type: 'object',
                properties: {
                    code: {type: 'integer', example: 422},
                    status: {type: 'string', example: 'Unprocessable Entity'},
                    errors: {
                        type: 'array',
                        items: {type: 'string', example: 'Error message about unprocessable entity request.'},
                    },
                },
            },
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    paths: {
        // author paths
        '/api/authors': {
            post: {
                summary: 'Register a new author',
                description: 'Allows a new author to register by providing a name, email, password, and bio.',
                tags: ['Authors'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/RegisterAuthorRequest' },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Author created successfully.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/RegisterAuthorResponse' },
                            },
                        },
                    },
                    409: {
                        description: 'Conflict - Author already exists with the provided email.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse409' },
                            },
                        },
                    },
                    422: {
                        description: 'Validation error due to invalid input data.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse422' },
                            },
                        },
                    },
                },
            },
        },
        '/api/authors/login': {
            post: {
                summary: 'Author login',
                description: 'Allows an author to log in with their email and password.',
                tags: ['Authors'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LoginAuthorRequest' },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login successful with access and refresh tokens returned.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/AuthorResponse' },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized - Incorrect email or password.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse401' },
                            },
                        },
                    },
                    422: {
                        description: 'Validation error due to invalid login data.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse422' },
                            },
                        },
                    },
                },
            },
        },
        '/api/authors/profile': {
            get: {
                summary: 'Get logged-in author profile',
                description: 'Retrieves the profile information of the currently logged-in author.',
                tags: ['Authors'],
                security: [{ BearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Successfully retrieved author profile data.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/AuthorResponse' },
                            },
                        },
                    },
                    401: {
                        description: 'Unauthorized - No token or incorrect format provided.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse401' },
                            },
                        },
                    },
                    403: {
                        description: 'Forbidden - Token is expired or invalid.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse403' },
                            },
                        },
                    },
                    404: {
                        description: 'Not Found - Author does not exist.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse404' },
                            },
                        },
                    },
                },
            },
        },

        // book paths
        '/api/books': {
            post: {
                summary: 'Create a new book',
                description: 'Allows an authenticated author to create a new book by providing book details such as title, author, publisher, year of publication, genre, and ISBN.',
                tags: ['Books'],
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/CreateBookRequest' },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Book created successfully.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/CreatedBookResponse' },
                            },
                        },
                    },
                    409: {
                        description: 'Conflict - The book already exists with the same ISBN.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse409' },
                            },
                        },
                    },
                    422: {
                        description: 'Validation error due to invalid input data.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse422' },
                            },
                        },
                    },
                },
            },
            get: {
                summary: 'Get all books',
                description: 'Retrieves a list of all books available in the system.',
                tags: ['Books'],
                responses: {
                    200: {
                        description: 'Successfully retrieved the list of books.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        code: { type: 'integer', example: 200 },
                                        status: { type: 'string', example: 'OK' },
                                        data: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/BookResponse' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/books/{bookId}': {
            get: {
                summary: 'Get a book by ID',
                description: 'Retrieves detailed information about a specific book using its ID.',
                tags: ['Books'],
                parameters: [
                    {
                        name: 'bookId',
                        in: 'path',
                        required: true,
                        description: 'ID of the book to retrieve.',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Successfully retrieved the book.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/BookResponse' },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid ID format.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse400' },
                            },
                        },
                    },
                    404: {
                        description: 'Not Found - Book not found with the provided ID.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse404' },
                            },
                        },
                    },
                },
            },
            patch: {
                summary: 'Update a book',
                description: 'Updates the details of an existing book using its ID.',
                tags: ['Books'],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: 'bookId',
                        in: 'path',
                        required: true,
                        description: 'ID of the book to update.',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UpdateBookRequest' },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Book updated successfully.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/BookResponse' },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid ID format.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse400' },
                            },
                        },
                    },
                    404: {
                        description: 'Not Found - Book not found with the provided ID.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse404' },
                            },
                        },
                    },
                    422: {
                        description: 'Validation error due to invalid input data.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse422' },
                            },
                        },
                    },
                },
            },
            delete: {
                summary: 'Delete a book',
                description: 'Deletes a book from the system using its ID.',
                tags: ['Books'],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: 'bookId',
                        in: 'path',
                        required: true,
                        description: 'ID of the book to delete.',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Book deleted successfully.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        code: { type: 'integer', example: 200 },
                                        status: { type: 'string', example: 'OK' },
                                        data: { type: 'object', properties: { is_deleted: { type: 'boolean', example: true } } },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Invalid ID format.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse400' },
                            },
                        },
                    },
                    404: {
                        description: 'Not Found - Book not found with the provided ID.',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse404' },
                            },
                        },
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);
