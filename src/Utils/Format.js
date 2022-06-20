class Format {
    
    /**
     * 이 함수는 휴대폰번호 하이픈 자동 생성을 해줍니다.
     * @param {} phone 
     * @returns 
     */
    autoHyphen(phone) {
        phone = this.onlyNumber(phone);
        return phone.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }

    onlyNumber(num) {
        return num.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }

    pressenterkey = (e) => {
        if (e.key === "Enter") {
          //키를 눌렀을 때 동작할 코드
        }
      };

}

function isUserLogin() {
  const token = sessionStorage.getItem("token");
  if (token) {
      return true;
  } else {
      return false;
  }
}

export default new Format();