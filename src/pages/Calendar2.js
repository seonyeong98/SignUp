const date = new Date();

const viewYear = date.getFullYear();
const viewMonth = date.getMonth();

document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

const prevLast = new Date(viewYear, viewMonth, 0); //지난 달 마지막
const thisLast = new Date(viewYear, viewMonth + 1, 0); //이번 달 마지막

const PLDate = prevLast.getDate(); //지난달 마지막 날짜
const PLDay = prevLast.getDay(); //지난달 마지막 요일

const TLDate = thisLast.getDate();//이번 달 마지막 날짜
const TLDay = thisLast.getDay(); //이번 달 마지막 요일

const prevDates = []; //지난 달은 아직, 버튼 이벤트가 발생해야 불러오기 때문
const thisDates = [...Array(TLDate + 1).keys()].slice(1);
const nextDates = [];


//  받아온 날짜를 기준으로 배열에 day 숫자 값을 채워줌
if (PLDay !== 6) { //일요일이 아니면
    for (let i = 0; i < PLDay + 2; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
  
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  
  dates.forEach((date, i) => {
    dates[i] = `<div class="date">${date}</div>`
  })

  document.querySelector('.dates').innerHTML = dates.join('');