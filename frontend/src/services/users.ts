// // services/user.ts
// //import api from './api'; // Assuming api.ts sets up Axios with base URL and headers

// // Define the expected shape of a user profile response
// interface UserProfile {
//   email: string;
//   // Add other fields if your user profile has more properties
// }

// // Define the shape of data to update the profile
// interface UpdateProfileData {
//   email: string;
//   password?: string; // Password is optional; only update if provided
// }

// // Fetch the user's profile information
// export const getUserProfile = async (): Promise<UserProfile> => {
//   try {
//     const response = await api.get('/user/profile');
//     return response.data; // Returns the user's profile data
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     throw error; // Rethrow error to handle in the component
//   }
// };

// // Update the user's profile information
// export const updateUserProfile = async (data: UpdateProfileData): Promise<void> => {
//   try {
//     await api.put('/user/profile', data); // Update profile with new email or password
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     throw error; // Rethrow error to handle in the component
//   }
// };
