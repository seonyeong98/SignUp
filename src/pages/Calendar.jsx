import React, {Component} from 'react';
import moment, { now } from 'moment'
import "./style.css"


class Calendar extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            dates: [],
            result: [],
            tags: []
        } 
    
    }

    componentDidMount() {
        this.getCalendar();
    }

    
    getCalendar =()=> {
        const date = new Date();        

        const year = date.getFullYear();
        const month = date.getMonth();
        
        const lastMonthEnd = new Date(year, month, 0)//지난 달 마지막 날짜
        const lastMonthDate = lastMonthEnd.getDate(); //지난달 마지막 'dd'
        const lastMonthDay = lastMonthEnd.getDay(); //지난달 마지막 요일

        const thisMonthLastEnd = new Date(year, month + 1, 0); //이번 달 마지막날짜
        const thisMonthLastDate = thisMonthLastEnd.getDate();//이번달 마지막 'dd'
        const thisMonthLastDay = thisMonthLastEnd.getDay(); //이번달 마지막 요일

        
        const lastMonthDates = []; 
        const thisMonthDates = [...Array(thisMonthLastDate + 1).keys()].slice(1);
        const nextMonthDates = []; 


        //이전날짜 받아오기
        if (lastMonthDay !== 6) { 
            for (let i = 0; i <= lastMonthDay; i++) {
                lastMonthDates.unshift(lastMonthDate - i);
            }
        }

        //다음달 받아오기
        for (let i = 1; i < 7 - thisMonthLastDay; i++) {
            nextMonthDates.push(i);
        }

        const dates = lastMonthDates.concat(thisMonthDates, nextMonthDates);

        const firstDateIndex = dates.indexOf(1);
        const lastDateIndex = dates.lastIndexOf(thisMonthLastDate);
        

        let tags = [];
        dates.forEach((date, i) => {

            if (i >= firstDateIndex && i <= lastDateIndex) {
                tags.push(<div class="date">{date}</div>)
            } else {
                const className = (i < firstDateIndex) ? "before" : "after";
                tags.push(<div class={`date ${className}`}>{date}</div>);
                
                /*
               if (i < firstDateIndex) {
                    tags.push(<div class="date before">{date}</div>)
               } else {
                    tags.push(<div class="date after">{date}</div>)
               }
               */

               //tags.push(<div class={`date ${i < firstDateIndex ? "before" : "after"}`}>{date}</div>)
            }
            /*
            const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';
                      tags.push(<div class="date">{date}</div>)
            */
        })
        //console.log("@@", datesKeyValues)
        
        
        /*
        dates.forEach((date) => {
            tags.push(<div class="date">{date}</div>)
        });
        */


        //tags = [];
        //tags = dates.map((date) => (<div class="date">{date}</div>));
        console.log("태그2", tags)

        this.setState({
            dates: dates,
            tags: tags
        })
    }

    render() {
        const {dates} = this.state;
        console.log("결과", dates)
        return (
            <>
            <div class="calendar">
                <div class="header">
                    <div class="year-month">

                    </div>
                    <div>
                        <button type = "button">&lt;</button>
                        <button type = "button">오늘</button>
                        <button type = "button">&gt;</button>
                    </div>

                </div>
                <div class="main">
                    <div class="days">
                        <div class="day">일</div>
                        <div class="day">월</div>
                        <div class="day">화</div>
                        <div class="day">수</div>
                        <div class="day">목</div>
                        <div class="day">금</div>
                        <div class="day">토</div>
                    </div>
                    <div class="dates">
                        {
                            dates.map(date => (
                                <div class="date">{date}</div>        
                            ))
                        }
                    </div>

                    <br/><br/><br/><br/><br/><br/>

                    <div class="days">
                        <div class="day">일</div>
                        <div class="day">월</div>
                        <div class="day">화</div>
                        <div class="day">수</div>
                        <div class="day">목</div>
                        <div class="day">금</div>
                        <div class="day">토</div>
                    </div>
                    <div class="dates">
                        {this.state.tags}
                    </div>
                </div>
            </div>

            <style jsx>
            {`
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
    
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
    
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .calendar {
                width: 600;
                margin: 50px;
            }
            
            .before {
                opacity: 30%
            }

            .after {
                opacity: 30%
            }
    
            .days {
                display: flex;
                margin: 25px 0 10px;
            }
    
            .day {
                width: calc(100% / 7);
                text-align: center;
            }
    
            .dates {
                display: flex;
                flex-flow: row wrap;
                height: 500px;
                border-top: 1px solid #333333;
                border-right: 1px solid #333333;
            }
    
            .date {
                width: calc(100% / 7);
                padding: 15px;
                text-align: right;
                border-bottom: 1px solid #333333;
                border-left: 1px solid #333333;
            }
    
            .date:nth-child(7n + 1) {
                color: red
            }
    
            .date:nth-child(7n) {
                color: blue
            }
            `}
            </style>
            </>
        );
    }
}



export default Calendar;