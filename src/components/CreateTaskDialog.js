import React from 'react';
import PropTypes from 'prop-types';

import {NavItem, Modal,Form, FormGroup, FormControl,
  Button, ButtonToolbar} from 'react-bootstrap';

export default class CreateTaskDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state={ showing:false};
        this.showDialog=this.showDialog.bind(this);
        this.hideDialog=this.hideDialog.bind(this);
        this.submit=this.submit.bind(this);
    }
    showDialog(){
        this.setState({showing: true});
    }
    hideDialog(){
        this.setState({showing:false});
    }



    submit(e){
        e.preventDefault();
        this.hideDialog();
        const form=document.forms.taskAdd;
        const newTask={
            taskName: form.taskName.value,
            taskDesc: form.taskDesc.value,
            createdBy: form.createdBy.value,
            status: 'New',
            createdOn: new Date(),
        };
        //use the parent callback--the modal just collects the data//
        this.props.createTask(newTask);
    }

    render(){
        return(
            <Button onClick={this.showDialog}>New Task(+)
              <div onClick={e => e.stopPropagation()}>
                <Modal keyboard show={this.state.showing}
                                onHide={this.hideDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form name="taskAdd">
                            Created By:
                            <FormControl name="createdBy" autoFocus/>
                            Task Name:
                            <FormControl name="taskName"/>
                            Task Description:
                            <FormControl name="taskDesc"/>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button type="button"  size="md"
                             onClick={this.submit}>Create</Button>
                            <Button type="link"
                            onClick={this.hideDialog}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
              </div>
            </Button>

        );
    }
}

CreateTaskDialog.propTypes={
    projectId: PropTypes.string.isRequired,
    createTask: PropTypes.func.isRequired,
}

///export default withRouter(CreateTaskDialog);
