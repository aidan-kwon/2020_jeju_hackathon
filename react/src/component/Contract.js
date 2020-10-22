import React, {Fragment, useState, useEffect} from "react";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import DatePicker from 'react-date-picker';
import { Redirect } from 'react-router-dom';
import Clock from 'react-live-clock';
import Moment from 'react-moment';

const urlElements = window.location.pathname.split('/');
const id = (urlElements[2]);


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    formWrapper: {
        padding: '1.0rem 0',
        borderBottom: '1px solid #eeeeee ',
        maxWidth: 360,
      },
  }));

function Contract() {
    const classes = useStyles();
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [SSN, setSSN] = useState(null);
    const [Address, setAddress] = useState(null);
    const [term, setTerm] = useState(null);
    const [date, setDate] = useState(null);
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [startDate1, setStartDate1] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [contract, setContract]= useState(null);
    const currentdate = new Date();

    const getRoom = async () => {
        
        await axios.get(`https://blog.nopublisher.dev/room/${id}`,
            {
              headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
              }
            }
          ).then((res) => {
            setRoom(res.data);
            console.log(res.data);
          },[])
      };
      useEffect (async () => {
        const userParse = JSON.parse(window.localStorage.getItem('user'));
        setUser(userParse);
        await getRoom();
        console.log(userParse)
      },[]);

    const tempStyle={
        margin : "0 auto",
        marginBottom : "3%",
        width:"300px",
        marginLeft:'2em'
    }    
    const defaultProps = {
        bgcolor: 'background.paper',
        m: 1,
        border: 1,
        style: { marginLeft: '1.5em', width: '330px', height: '8rem' },
      }
    // function showPopup(){
    //     this.setState({  
    //          showPopup: !this.state.showPopup  
    //       }); 
    //   }

    const onChangeAddress = e => {
        // setAddress(e.target.value);
    }

    const onChangePhoneNumber = e => {
        // setPhoneNumber(e.target.value);
    }

    const onChangeSSN = e => {
        // setSSN(e.target.value);
    }
    const onChangeDate = e => { 
        setDate(e.target.value);
    }
    const onChangeTerm = e => {
        setTerm(e.target.value);
    }
    const onClick = async (e) => {
        console.log(user);
        console.log(user.id);
        user.userType === 1 ?
        axios.post(`https://blog.nopublisher.dev/room/lessor_contract/${id}`,
                    { 
                        "roomId" : id,
                        "lessorId": user.id,
                        "lessorSSN": SSN,
                        "lessorphoneNumber": phoneNumber,
                        "lessorAddress": Address,
                        "date": startDate,
                        "startDate": startDate1,
                        "endDate": endDate,
                    },
                    {
                        'Content-Type': 'application/json',
                    },
                ).then((res) => {
                    console.log(res);
                    // setContract(1);
                })
        : 
        axios.post(`https://blog.nopublisher.dev/room/lessee_contract/${id}`,
            {
                "roomId" : id,
                "lesseeId": user.id,
                "lesseeSSN": SSN,
                "lesseephoneNumber": phoneNumber,
                "lesseeAddress": Address,
                "date": startDate,
                "startDate": startDate1,
                "endDate": endDate,
            },
            {
                'Content-Type': 'application/json',
            },
        ).then((res) => {
            console.log(res);
            // setContract(1);
        })
}

        return (
            <div>
             <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                    임대차 계약서
            </Typography>
            <br />
            <div>
                <Box borderRadius={16} borderColor="grey.500" {...defaultProps}>
                    <div style={{textAlign:'left', fontSize: '0.8rem', marginTop: '1em', marginLeft:'1em'}}>
                        사무실 소유주 : {room && room.name}
                    </div> 
                    
                    <div style={{textAlign:'left', fontSize: '0.8rem', marginTop: '0.5em', marginLeft:'1em'}}>
                        사무실 소재지 : {room && room.address}
                    </div>
                    {/* {user.data.address} */}
                     <div style={{textAlign:'left', fontSize: '0.8rem', marginTop: '0.5em', marginLeft:'1em'}}>
                        사무실 구조 : {room && room.structure} 층
                    </div>
                    <div style={{textAlign:'left', fontSize: '0.8rem', marginTop: '0.5em', marginLeft:'1em'}}>
                        사무실 평수 : {room && room.acreage} m^2
                    </div>
                </Box>
             

 {/* 본인인증과 계약 내용 순서바꾸기 */}
                <br />
                <div style={{textAlign:'left' ,marginLeft:'1.5em'}}>
                    계약 내용
                </div>
                <Box borderRadius={16} borderColor="grey.500" {...defaultProps}>
                     <div style={{float:'left', textAlign:'left', fontSize: '0.8rem', marginTop: '2em', marginRight: '38px', marginLeft:'2.1em'}}>
                        계약일
                    </div>
                    <div style={{float:'left', marginTop: '1.3em', marginLeft:'1em'}}> 
                        <Moment date={currentdate} format={"YYYY-MM-DD"}/>
                        <br />
                </div>   
                    <br />
                    <div style={{ float:'left',textAlign:'left', fontSize: '0.8rem', marginTop: '0.5em', marginLeft:'2em', marginRight:'10px'}}>
                        임대기한 
                        <div style={{ width: '164px',fontSize: '1rem', float:'left',marginLeft:'5.5em', marginTop: '-1em'}}> 
                       
                        <DatePicker
                        value={startDate1}
                        format="y-MM-dd"
                        onChange={e => setStartDate1(e)}
                        
                        />
                    
                        <DatePicker
                        value={endDate}
                        onChange={e => setEndDate(e)}
                        format="y-MM-dd"

                        />
                    </div>
                
                    </div>
                    <div style={{ float:'left',marginLeft:'1em'}}> 
                    
                </div>
                </Box>

                <br />
                <div style={{textAlign:'left' ,marginLeft:'1.5em'}}>
                    계약 당사자 본인 인증
                </div>              
                <Box borderRadius={16} borderColor="grey.500" {...defaultProps}>
                    {user && user.userType === 1 ?
                     <div textAlign="center" style={{ textAlign:'center',fontWeight:'bold',  fontSize: '0.8rem', marginTop: '0.5em', marginLeft:'1em'}}>
                        <bold>임대인</bold>
                        <br/> <br/>
                        <div style={{textAlign:'left', fontSize: '0.8rem', marginTop: '0.5em', marginLeft:'1em'}}>
                                전화번호 : <Input style={{marginTop:'-0.5rem', marginBottom:'0.3rem',marginLeft: '0.3rem', fontSize:'0.8rem'}} placeholder="입력하세요" inputProps={{ 'aria-label': 'description' }} onChange={onChangePhoneNumber}/>
                        <br/>    주소 : <Input style={{marginTop:'-0.5rem', marginBottom:'0.3rem',marginLeft: '1.7rem', fontSize:'0.8rem'}} placeholder="입력하세요" inputProps={{ 'aria-label': 'description' }} onChange={onChangeAddress}/>
                        {/* <br/>    주민번호 : <Input style={{marginTop:'-0.5rem', marginBottom:'0.3rem',marginLeft: '0.3rem', fontSize:'0.8rem'}} placeholder="입력하세요" inputProps={{ 'aria-label': 'description' }} onChange={onChangeSSN} /> */}
                        </div>
                        </div>
                     : <div style={{textAlign:'center',fontWeight:'bold', fontSize: '0.8rem', marginTop: '1em', marginLeft:'1em'}}>
                        <bold>임차인</bold>
                        <br/> <br/>
                        <div style={{textAlign:'left', fontSize: '0.8rem', marginTop: '0.5em', marginLeft:'1em'}}>
                                전화번호 : <Input style={{marginTop:'-0.5rem', marginBottom:'0.3rem',marginLeft: '0.3rem', fontSize:'0.8rem'}} placeholder="입력하세요" inputProps={{ 'aria-label': 'description' }} onChange={onChangePhoneNumber}/>
                        <br/>    주소 : <Input style={{marginTop:'-0.5rem', marginBottom:'0.3rem',marginLeft: '1.7rem', fontSize:'0.8rem'}} placeholder="입력하세요" inputProps={{ 'aria-label': 'description' }} onChange={onChangeAddress}/>
                        {/* <br/>    주민번호 : <Input style={{marginTop:'-0.5rem', marginBottom:'0.3rem',marginLeft: '0.3rem', fontSize:'0.8rem'}} placeholder="입력하세요" inputProps={{ 'aria-label': 'description' }} onChange={onChangeSSN} /> */}
                        </div>
                    </div>}  
                     
                </Box> 
                <br />
                <div style={{textAlign:'left', fontSize: '0.6rem', marginTop: '0.5em', marginLeft:'5em'}}>
                        위 사무실 소유 물건 및 그 정착물, 부속물 모두 {}부터 본인의 임차합니다. <br/>
                        따라서 아래 조항을 굳게 지켜 추호도 위배글이 없을 것을 확인합니다.
                </div>
                         <br />
                        <Button style={tempStyle} variant="contained" size="large" type="submit" background-color="#6610f2"
                        onClick={onClick}>동의 및 제출</Button>
                    </div>  
                    {contract && <Redirect to="/Payment" /> }
        </div>    
        );
  }

export default Contract;
