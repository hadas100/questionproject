import React, { useRef, useEffect, useState } from 'react'
import { addQuestionsToState, addQuestionToState, saveUser, deleteQuestion } from './rducer/action'
import { loginUser, addQuestion, getHistoryQuestion } from './service'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button,Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function mapStateToProps(state) {
    return {
        question: state.question,
    };
}
export default connect(mapStateToProps)(function QuestionList(props) {

    const { question, dispatch } = props;
    const [postsList, setPostsList] = useState([]);
    const [questionState, setQuestionState] = useState("");
    const [answerState, setAnswerState] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        try{
      const historyData = await getHistoryQuestion();
         console.log(historyData);
         dispatch(addQuestionsToState(historyData))
        const rawData =  await fetch('https://jservice.io//api/clues');
        const data = await rawData.json()
        if (data)
            setPostsList(data)
        console.log(data)
        setIsLoading(false);
        }catch(err)  { 
            console.log("111111111111111111" + err) 
            setIsLoading(false);
            }
    }, [])

    const onAddQuestion = async (e) => {
       
         const data1 = await addQuestion({ question: questionState, answer: answerState })  
         console.log(data1);
         if (data1) {  
            dispatch(addQuestionToState({question: data1.myTask.question, answer: data1.myTask.answer}))
         }
        
    }
  async function  handleAddClick(item){
 const data1 = await addQuestion({ question: questionState, answer: answerState })  
         console.log(data1);
         if (data1) {  
            dispatch(addQuestionToState(item))
         }
        
    }


    if(isLoading) return<div>
  
    <>
  <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
     Loading... please wait
  </Button>
</>
    </div>

    return (
        <div>
        <div style={{display:'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent:'space-between'}}>
              <Card style={{ width: '25rem', margin: "auto", padding: "10px" }}>
                <label>Question: <input type="text" value={questionState} onChange={event => setQuestionState(event.target.value)} /></label>
                <br></br>
                <label>Answer: <input type="text" value={answerState} onChange={event => setAnswerState(event.target.value)} /></label>
                <Button style={{ marginLeft: "auto", marginRight: "auto", width: "80%", display: "inline" }} onClick={onAddQuestion}>Add question</Button>
            </Card>
            <Link to="/historyQuestion">
                <button type="button">
                    Historical questions
               </button>
            </Link>

            <Link to="/login">
                <button type="button">
                    back
               </button>
            </Link>
            </div>
            <br/>
            <div style={{display:'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'space-around'}}>
            {postsList?.map(item => <Card key={item.id} style={{ height: '180px', width: '25vw', alignItems: "center", marginBottom: '3em', marginLeft: "auto", marginRight: "auto",border: "3px solid green" }}
>
                <Card.Body><Card.Text>the question: {item.question}</Card.Text>

                    <Button variant="info" onClick={() => handleAddClick(item)} >to add </Button>
                </Card.Body>
            </Card>)}
      ‏
        </div>
        </div>
    )
})





