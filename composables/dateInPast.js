export const dateInPast = function(date) {
    if (new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
        return false;
    }
    return true;
};