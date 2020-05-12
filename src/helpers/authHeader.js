import { authUserService } from '../requests/UserRequests';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authUserService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { headers: { "Authorization": `Bearer ${currentUser.token}` } };
    } else {
        return {};
    }
}