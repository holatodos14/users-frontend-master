
export function validateUserData(data) {
  const errors = {}

  if (typeof data.email !== 'string' || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email address'
  }
  if (typeof data.photo !== 'string' || !/^https?:\/\/.*\.(jpg|jpeg|png)$/.test(data.photo)) {
    errors.photo = 'Invalid photo URL'
  }
  if (typeof data.name !== 'string' || data.name.trim() === '') {
    errors.name = 'Name is required'
  }
  if (typeof data.password !== 'string' || data.password.length < 8) {
    errors.password = 'Password must have at least 8 characters'
  }

  return Object.keys(errors).length > 0 ? { errors } : { valid: true }
}

export const exampleUserData = {
  email: 'example@example.com',
  photo: 'http://example.com/photo.jpg',
  name: 'John Doe',
  password: 'securepassword123',
  bio: '',
  phone: '',
}

// Example validation result
export const validationResult = validateUserData(exampleUserData)
if (validationResult.errors) {
  console.error('Validation errors:', validationResult.errors)
} else {
  console.log('User data is valid')
}
