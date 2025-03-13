import {postRequest} from "./request";
import CONSTANTS from "@/constants";

const authService = {
    login({code}) {
        return postRequest(CONSTANTS.API_ENDPOINTS.OAUTH_GOOGLE, {
            code,
        });
    },
};

export default authService;
