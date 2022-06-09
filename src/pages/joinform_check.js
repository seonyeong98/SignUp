function isUserLogin() {
    const token = sessionStorage.getItem("token");
    if (token) {
        return true;
    } else {
        return false;
    }
}

//regExp : 패턴을 사용해 텍스트를 판별할 때 사용



function phoneNumber(pnu) {
    pnu = pnu.replace(/[^0-9]/g, "");
    return pnu.replace(
      /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
      "$1-$2-$3"
    );
  }




function isValidEmail(email) {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regex.test(email)) {
        alert("유효하지 않은 이메일 형식입니다.");
        return false;
    }
    return true;
}
