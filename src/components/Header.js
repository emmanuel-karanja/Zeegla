import React from 'react';

class Header extends React.Component{
 constructor(props){
   super(props);

   this.onProjectSelectionChanged=this.onProjectSelectionChanged.bind(this);
 }

 onProjectSelectionChanged=(e)=>{
   this.props.onCurrentProjectChange(e.target.value);
 }

  render(){
    const projectOptions=this.props.projects.map(project=>
    <option key={project._id} value={project._id}>
        {project.title}
    </option>,
  );

   return(
     <div className="project-item">
       Project:
        <select onChange={this.onProjectSelectionChanged}
                className="project_menu">
                {projectOptions}
        </select>
      </div>
   );

  }
}


export default Header;
