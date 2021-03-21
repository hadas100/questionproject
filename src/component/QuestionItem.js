import React, {useState} from 'react';
import { Card, Button } from 'react-bootstrap';

const QuestionItem = props => {
    const{item} = props
    const [editMode, setEditMode] = useState(false);
    const [editQuestion, setEditQuestion] = useState(item.question);

    const onEditQuestion = () => {
        if(editMode === false){
            setEditMode(true);
        }else{
            setEditMode(false);
            props.onEditQuestion({...item, question: editQuestion})
        }
    }
    return(
        <Card  key={item._id}  style={{ width: '25rem', margin: "auto", padding: "10px" }}>
                <Card.Body><Card.Text>{editMode === false?
                   ` the question: ${item.question}`
                    :
                    <input type="text" value={editQuestion} onChange={event => setEditQuestion(event.target.value)} />}</Card.Text>
                    <Button variant="info" onClick={onEditQuestion} >{editMode === false? 'to Edit' : 'to Update'} </Button>
                    <Button variant="info" onClick={() => props.onDeleteQuestion(item._id)} >to delete</Button>
                </Card.Body>
            </Card>
    )
};

export default QuestionItem;