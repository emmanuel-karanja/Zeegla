import React from 'react';
import PropTypes from 'prop-types';
import{withRouter} from 'react-router-dom';
import {Modal,Form, FormControl, Button, ButtonToolbar} from 'react-bootstrap';
import DateInput from "./DateInput";
import axios from 'axios';

export default class CreateProjectDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state={ showing:false}
        console.log(`inside createProjectDialog: `+this.state.showing);
        this.showDialog=this.showDialog.bind(this);
        this.hideDialog=this.hideDialog.bind(this);
        this.submit=this.submit.bind(this);
    }
    showDialog(){
        this.setState({showing: true});
    }
    hideDialog(){
      console.log(`inside createProject hideDialog`+ this.state.showing);
        this.setState({showing:false});
        this.forceUpdate();
      console.log(`leaving hideDialog`+ this.state.showing);
    }
    componentDidUpdate(){
      console.log(`Inside the createProjectDialog componentDidUpdate`);
      console.log(this.state.showing);
      console.log('Leaving the componentDidUpdate..');
    }

    shouldComponentUpdate(nextProps, nextState){
      if(this.state.showing === nextState.showing){
        return false;
      }
      return true;
    }

   componentWillUpdate(nextProps, nextState){
     console.log('Inside componentWillUpdate..');
     console.log(this.state.showing);
     console.log('Next State');
     console.log(nextState.showing);
     console.log('Leaving componentWillUpdate');
   }
    submit(e){
        e.preventDefault();
        this.hideDialog();
        const form=document.forms.projectAdd;
        const newProject={
            createdBy: form.createdBy.value,
            projectName: form.projectName.value,
            projectDesc: form.projectDesc.value,
            status: 'New',
            createdOn: new Date(),
        };
        this.props.createProject(newProject);

    }


    render(){
        return(
            <Button onClick={this.showDialog}>New Project(+)
            <div onClick={e => e.stopPropagation()}>
                <Modal keyboard show={this.state.showing} onHide={this.hideDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form name="projectAdd">
                            Created By:
                            <FormControl name="createdBy" autoFocus/>
                            Project Name:
                            <FormControl name="projectName" />
                            Project Description:
                            <FormControl name="projectDesc"/>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button type="submit"  variant="primary" size="md" onClick={this.submit}>Create</Button>
                            <br/>
                            <Button type="button" variant="secondary" onClick={this.hideDialog}>Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
                </div>
            </Button>

        );
    }
}
CreateProjectDialog.propTypes={
    createProject: PropTypes.func.isRequired,
}
