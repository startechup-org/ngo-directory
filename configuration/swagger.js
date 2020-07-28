const swaggerJSDoc = require('swagger-jsdoc');

const { version, name, description } = require('../package.json');

const api = {
	'/users': {
		get: {
			tags: ['api'],
			operationId: 'GetAllUsersList',
			summary: 'get all users',
			responses: {
				200: {
					description: 'Ok',
				},
				400: {
					description: 'Invalid token',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
	},
	'/users/{user_type}': {
		get: {
			tags: ['api'],
			operationId: 'GetUsersByType',
			summary: 'get all users by type: user, ngo_admin, super_admin',
			parameters: [
				{
					name: 'user_type',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Ok',
				},
				400: {
					description: 'Invalid token',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
	},
	'/user': {
		post: {
			tags: ['api'],
			operationId: 'Register',
			summary: 'register a user',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								username: {
									type: 'string',
									require: true,
									example: 'user123',
								},
								name: {
									type: 'string',
									require: true,
									example: 'User 123',
								},
								email: {
									type: 'string',
									require: true,
									example: 'user123@user.com',
								},
								password: {
									type: 'string',
									require: true,
									example: 'pass123',
								},
								language: {
									type: 'string',
									require: true,
									example: 'English',
								},
								country: {
									type: 'string',
									require: true,
									example: 'US',
								},
								userType: {
									type: 'string',
									require: true,
									example: 'ngo_admin',
								},
								organizations: {
									type: 'array',
									require: true,
									example: [
										'5f1e38da5e400477743fa530',
										'5e14078a59f0711c13792871',
										'5e14078a59f0711c13792873',
									],
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Ok',
				},
				401: {
					$ref: '#/components/responses/UnAuthorizedError',
				},
			},
		},
	},
	'/user/{user_id}': {
		get: {
			tags: ['api'],
			operationId: 'GetUserById',
			summary: 'get specific user by id',
			parameters: [
				{
					name: 'user_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Ok',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
		put: {
			tags: ['api'],
			operationId: 'UpdateUser',
			summary: 'update user details',
			parameters: [
				{
					name: 'user_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								username: {
									type: 'string',
									require: true,
									example: 'user123',
								},
								name: {
									type: 'string',
									require: true,
									example: 'User 123',
								},
								email: {
									type: 'string',
									require: true,
									example: 'user123@user.com',
								},
								language: {
									type: 'string',
									require: true,
									example: 'English',
								},
								country: {
									type: 'string',
									require: true,
									example: 'US',
								},
								userType: {
									type: 'string',
									require: true,
									example: 'ngo_admin',
								},
								organizations: {
									type: 'array',
									require: true,
									example: [
										'5f1e38da5e400477743fa530',
										'5e14078a59f0711c13792871',
										'5e14078a59f0711c13792873',
									],
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Ok',
				},
				401: {
					$ref: '#/components/responses/UnAuthorizedError',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
		delete: {
			tags: ['api'],
			operationId: 'DeleteUser',
			summary: 'delete a specific user',
			parameters: [
				{
					name: 'user_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Entry deleted',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
	},
	'/user/{user_id}/organizations': {
		get: {
			tags: ['api'],
			operationId: 'GetOrganizationsByUser',
			summary: 'get all organization managed by user',
			parameters: [
				{
					name: 'user_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Ok',
				},
				400: {
					description: 'Invalid token',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
	},
	'/user/login': {
		post: {
			tags: ['api'],
			operationId: 'Login',
			summary: 'user login',
			parameters: [],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								email: {
									type: 'string',
									require: true,
									example: '',
								},
								password: {
									type: 'string',
									require: true,
									example: '',
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Ok',
				},
				400: {
					description: 'Invalid email/password',
				},
			},
		},
	},
	'/user/logout': {
		post: {
			tags: ['api'],
			operationId: 'Logout',
			summary: 'user logout',
			parameters: [],
			responses: {
				200: {
					description: 'Ok',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
	},
	'/user/token/{refresh_token}': {
		get: {
			tags: ['api'],
			operationId: 'GetAccessTokenViaRefreshToken',
			summary: 'get access token using refresh token',
			parameters: [
				{
					name: 'refresh_token',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Ok',
				},
				400: {
					description: 'Invalid token',
				},
			},
		},
	},
	'/organizations': {
		get: {
			tags: ['api'],
			operationId: 'GetOrganizationList',
			summary: 'get all organizations list',
			responses: {
				200: {
					description: 'Ok',
				},
				400: {
					description: 'Invalid token',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
	},
	'/organization': {
		post: {
			tags: ['api'],
			operationId: 'AddOrganization',
			summary: 'add new organization',
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								org_name: {
									type: 'string',
									require: true,
									example: 'Bantay Bata 163',
								},
								org_description: {
									type: 'integer',
									require: true,
									example: 'rescues abused children',
								},
								org_country: {
									type: 'string',
									require: true,
									example: 'Philippines',
								},
								org_city: {
									type: 'string',
									require: true,
									example: 'Cebu City',
								},
								org_picture: {
									type: 'string',
									require: false,
									example:
										'https://en.facebookbrand.com/facebookapp/assets/f-logo/',
								},
								admins: {
									type: 'array',
									require: false,
									example: ['5f1e4d348017c285c9a4bcdb'],
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Ok',
				},
				401: {
					$ref: '#/components/responses/UnAuthorizedError',
				},
			},
		},
	},
	'/organization/{organization_id}': {
		get: {
			tags: ['api'],
			operationId: 'GetOrganizationById',
			summary: 'get specific organization by id',
			parameters: [
				{
					name: 'organization_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Ok',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
		put: {
			tags: ['api'],
			operationId: 'UpdateOrganization',
			summary: 'user modifies details of a specific organization by id',
			parameters: [
				{
					name: 'organization_id',
					in: 'path',
					schema: {
						type: 'string',
					},
				},
			],
			requestBody: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								org_name: {
									type: 'string',
									require: true,
									example: 'Bantay Bata 163',
								},
								org_description: {
									type: 'integer',
									require: true,
									example: 'rescues abused children',
								},
								org_country: {
									type: 'string',
									require: true,
									example: 'Philippines',
								},
								org_city: {
									type: 'string',
									require: true,
									example: 'Cebu City',
								},
								org_picture: {
									type: 'string',
									require: false,
									example:
										'https://en.facebookbrand.com/facebookapp/assets/f-logo/',
								},
								admins: {
									type: 'array',
									require: false,
									example: ['5f1e4d348017c285c9a4bcdb'],
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Ok',
				},
				401: {
					$ref: '#/components/responses/UnAuthorizedError',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
		delete: {
			tags: ['api'],
			operationId: 'DeleteOrganization',
			summary: 'user deletes a specific organization',
			parameters: [
				{
					name: 'organization_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Organization deleted',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
	},
	'/organization/{organization_id}/admins': {
		get: {
			tags: ['api'],
			operationId: 'GetAdminsByOrganization',
			summary: 'get all admins per organization',
			parameters: [
				{
					name: 'organization_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
				},
			],
			responses: {
				200: {
					description: 'Ok',
				},
				400: {
					description: 'Invalid token',
				},
			},
			security: [
				{
					Bearer: [],
				},
			],
		},
	},
};

// https://editor.swagger.io/
const swaggerDefinition = {
	openapi: '3.0.1',
	info: {
		title: name,
		version,
		description,
	},
	host: 'localhost:3000',
	basePath: '/',
	tags: [],
	paths: {
		...api,
	},
	components: {
		securitySchemes: {
			Bearer: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		responses: {
			UnAuthorizedError: {
				description: 'Access token is missing or invalid',
			},
		},
	},
};

const options = {
	swaggerDefinition,
	apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
