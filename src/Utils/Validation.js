class Validation {
    
    isValidEmail(email) {
        const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!regex.test(email)) {
            alert("유효하지 않은 이메일 형식입니다.");
            return false;
        }
        return true;
    }
}

export default new Validation();