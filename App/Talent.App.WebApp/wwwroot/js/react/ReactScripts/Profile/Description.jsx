import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Input } from 'semantic-ui-react';
import { updateLocale } from 'moment';

export class Description extends React.Component {
    constructor(props) {
        super(props);
        const Description = props.details ?
            Object.assign({}, props.details)
            : {
                description: "",
                summary: ""
            }
        this.state = {
            newDescription:Description,
            descriptionValue:'',
            characters: 0,
            edit:false
        };
        this.handleChange=this.handleChange.bind(this);
        this.changeDescription=this.changeDescription.bind(this)
        this.openEdit=this.openEdit.bind(this)
    }
    changeDescription()
    {
        const data = Object.assign({}, this.state.newDescription)
        this.props.saveProfileData(data)
        this.props.loadData()
        this.setState(
            {
                edit:false
            }
        )
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newDescription)
        data[event.target.name] = event.target.value
        this.setState({
            newDescription: data
        })
    }
    openEdit()
    {
        const details = Object.assign({}, this.props.details)
        this.setState(
            {
                edit:true,
                newDescription:details
            }
        )
    }
    render()
    {
        return (
            this.state.edit ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderDisplay() { 
        //const selctedvalue =this.state.newDescription.description ? this.state.newDescription.description : this.props.details.description
        const characterLimit = 600,summaryLength=150;
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                <div className="five wide column">
                <div className="field" >
                    <Input
                    maxLength={summaryLength}
                    name="summary" 
                    fluid icon='search' 
                    placeholder='Please provide a short summary about your self' 
                    defaultValue={this.props.details.summary}
                    onBlur={this.handleChange}
                    onChange={this.openEdit} />
                    </div>
                    <p>Summary must be no more than 150 Characters.</p>   
                    <p></p> 
                </div>
                <div className="ten wide column">
                    <div className="field" >
                    <textarea maxLength={characterLimit} 
                        name="description"
                        placeholder= "Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                        value={this.props.details.description}
                        onChange={this.openEdit}
                         > 
                        </textarea>

                    </div>
                    <p>Description must be between  150-600 Characters.</p>
                </div>
            </div>
            </div>
        )
    }
    renderEdit() { 
        //const selctedvalue =this.state.newDescription.description ? this.state.newDescription.description : this.props.details.description
        const characterLimit = 600,summaryLength=150;
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                <div className="five wide column">
                <div className="field" >
                    <Input
                    maxLength={summaryLength}
                    name="summary" 
                    fluid icon='search' 
                    placeholder='Please provide a short summary about your self' 
                    defaultValue={this.props.details.summary}
                    onBlur={this.handleChange}
                    onChange={this.handleChange} />
                    </div>
                    <p>Summary must be no more than 150 Characters.</p>   
                    <p></p> 
                </div>
                <div className="ten wide column">
                    <div className="field" >
                    <textarea maxLength={characterLimit} 
                        name="description"
                        placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." 
                        value={this.state.newDescription.description}
                        onChange={this.handleChange}
                         > 
                        </textarea>

                    </div>
                    <p>Description must be between  150-600 Characters.</p>
                </div>
                <button type="button" className="ui right floated teal button" onClick={this.changeDescription}>Save</button>
            </div>
            </div>
        )
    }
}
